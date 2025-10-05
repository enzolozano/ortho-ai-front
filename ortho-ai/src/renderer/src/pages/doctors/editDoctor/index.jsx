import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastSuccess, ToastError, ToastWarning } from '../../../components/Toast'
import { Modal, Button } from 'react-bootstrap'
import { ArrowLeft, Upload, X, Eye, EyeOff } from "lucide-react"
import { GetUserById, PostUser, PutUser } from '../../../services/users'
import { encryptDocument, decryptDocument } from '../../../utils/cryptoHelper'
import { GetAuthByUserId, DeleteAuth, PostRegister } from '../../../services/authentication'

export const DoctorScreen = () => {
  const [preview, setPreview] = useState(null)
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    document: "",
    phone: "",
    birthDate: "",
    registerDate: "",
    photo: null,
  })
  const { id } = useParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showAddAuth, setShowAddAuth] = useState(false)
  const [showAuthMessage, setShowAuthMessage] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleCloseAuthMessage = () => setShowAuthMessage(false)
  const handleShowAuthMessage = () => setShowAuthMessage(true)

  const handleCloseAddAuth = () => setShowAddAuth(false)
  const handleShowAddAuth = async () => {
    const response = await GetAuthByUserId(id)

    if (response?.success) {
      handleShowAuthMessage()
    } else {
      setShowAddAuth(true)
    }
  }
  
  useEffect(() => {
    async function searchDoctor() {
      const response = await GetUserById(id)

      if (response.message) {
        return ToastError(response.message);
      }

      let documentPlain = ''
      if (response.document) {
        const encryptedObj = JSON.parse(response.document);
        documentPlain = await decryptDocument(JSON.parse(encryptedObj))
      }

      const doctor = {
        id: id,
        name: response.name,
        email: response.email,
        document: documentPlain,
        phone: response.phone,
        birthDate: response.birth_date,
        registerDate: response.created_at,
        photo: response.photo_url
      }

      setPreview(doctor.photo)
      setDoctor(doctor)
    }
    
    if (id > 0) {
      searchDoctor()
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDoctor({
      ...doctor,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        
        setDoctor({
          ...doctor,
          photo: base64String
        });

        setPreview(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setDoctor({
      ...doctor,
      photo: null
    })
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!doctor.photo) {
      return ToastWarning("Foto do médico é obrigatória")
    }

    const encryptedDocument = doctor.document ? await encryptDocument(doctor.document) : ''

    const newDoctor = {
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      document: JSON.stringify(encryptedDocument),
      birth_date: doctor.birthDate,
      role: 1,
      photo_url: doctor.photo
    }

    const response = id > 0 ? await PutUser(id, newDoctor) : await PostUser(newDoctor)

    if (!response.success) {
      return ToastError(response.message)
    } 

    ToastSuccess(response.message)
    navigate('/doctors')
  }

  const handleRemoveAuth = async () => {
    await DeleteAuth(id)
    setShowAuthMessage(false)
    setShowAddAuth(true)
  }

  const addAuth = async () => {
    const response = await PostRegister(id, username, password)

    if (response?.success) {
      ToastSuccess(response.message)
      handleCloseAddAuth()
    } else {
      ToastError(response?.message || 'Falha desconhecida ao registrar autenticação do médico')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="h-5 w-5 text-gray-600 cursor-pointer" onClick={() => navigate('/doctors')} />
        <h1 className="text-2xl font-bold text-gray-800">Editar Médico</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Foto do médico */}
          <div className="space-y-2">
            {preview ? (
              <div className="relative w-32 h-32 mx-auto">
                <button
                  type="button"
                  className="absolute right-0 top-0 h-6 w-6 rounded-full bg-white shadow flex items-center justify-center"
                  onClick={clearFile}
                >
                  <X className="h-4 w-4" />
                </button>
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full max-w-xs text-sm"
                />
              </div>
            )}
          </div>

          {/* Informações do médico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={doctor.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={doctor.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={doctor.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                Documento
              </label>
              <input
                type="document"
                id="document"
                name="document"
                value={doctor.document}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={doctor.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="registerDate" className="block text-sm font-medium text-gray-700">
                Data de Cadastro
              </label>
              <input
                type="date"
                id="registerDate"
                name="registerDate"
                value={doctor.registerDate.split("T")[0]}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500">Este campo não pode ser alterado</p>
            </div>
          </div>

          <br />

          <div className="pt-4 border-t flex justify-between">
            <button
              type="button"
              disabled={id <= 0}
              className={`px-4 py-2 rounded-md
                ${id <= 0
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                }`
              }
              onClick={() => handleShowAddAuth()}
            >
              Adicionar autenticação
            </button>
            <div className="flex space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={() => navigate('/doctors')}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal centered show={showAuthMessage} onHide={handleCloseAuthMessage}>
        <Modal.Header>
          <Modal.Title>Atenção!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            O médico em questão já possui um registro de autenticação. Tem certeza que deseja excluir o atual e criar uma nova autenticação?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAuthMessage}>
            Não
          </Button>
          <Button variant="success" onClick={handleRemoveAuth}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={showAddAuth} onHide={handleCloseAddAuth}>
        <Modal.Header>
          <Modal.Title>Adicionar autenticação do médico</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-lg w-full"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseAddAuth}>
            Cancelar
          </Button>
          <Button variant="success" onClick={addAuth}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
