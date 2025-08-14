import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastWarning, ToastSuccess, ToastError } from '../../../components/Toast'
import { ArrowLeft, Upload, X } from "lucide-react"
import { GetPatientById, PostPatient, PutPatient } from '../../../services/users'

export const PatientScreen = () => {
  const [preview, setPreview] = useState(null)
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    registerDate: "",
    photo: null,
  })
  const { id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    async function searchPatient() {
      const response = await GetPatientById(id)  

      if (response.message) {
        return ToastError(response.message);
      }

      const patient = {
        id: id,
        name: response.patient.name,
        email: response.patient.email,
        phone: response.patient.phone,
        birthDate: response.patient.birth_date,
        registerDate: response.patient.created_at,
        photo: response.patient.photo_url
      }

      setPreview(patient.photo)
      setPatient(patient)
    }
    
    if (id > 0) {
      searchPatient()
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPatient({
      ...patient,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        
        setPatient({
          ...patient,
          photo: base64String
        });

        setPreview(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setPatient({
      ...patient,
      photo: null
    })
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPatient = {
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      birth_date: patient.birthDate,
      role: 0,
      photo_url: patient.photo
    }

    console.log(patient)
    console.log(newPatient)

    const response = id > 0 ? await PutPatient(id, newPatient) : await PostPatient(newPatient)

    console.log(response)

    if (!response.success) {
        return ToastError(response.message)
    } else {
      ToastSuccess(response.message)
      navigate('/patients')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="h-5 w-5 text-gray-600 cursor-pointer" onClick={() => navigate('/patients')} />
        <h1 className="text-2xl font-bold text-gray-800">Editar Paciente</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Foto do paciente */}
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

          {/* Informações do paciente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={patient.name}
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
                value={patient.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={patient.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={patient.birthDate}
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
                value={patient.registerDate.split("T")[0]}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500">Este campo não pode ser alterado</p>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => navigate('/patients')}
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
        </form>
      </div>
    </div>
  )
}
