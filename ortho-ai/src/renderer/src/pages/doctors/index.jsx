import { useState, useMemo, useEffect } from 'react'
import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { ToastError, ToastSuccess } from '../../components/Toast'
import { GetDoctors, RemoveUserById } from '../../services/users'
import { useAuth } from '../../contexts/AuthContext'

export const DoctorsScreen = () => {
  const [doctors, setDoctors] = useState([])

  const [removeId, setRemoveId] = useState(0)

  const [showRemoveDoctor, setShowRemoveDoctor] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const handleCloseRemoveDoctor = () => setShowRemoveDoctor(false)
  const handleShowRemoveDoctor = (id) => {
    setRemoveId(id)
    setShowRemoveDoctor(true)
  }

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await GetDoctors()

        if (response.message) {
          return ToastError(response.message)
        }

        const mappedDoctors = response.doctors.map(user => {
          const age = user.birth_date
            ? Math.floor(
                (new Date() - new Date(user.birth_date)) /
                  (365.25 * 24 * 60 * 60 * 1000)
              )
            : null

          return {
            id: user.id,
            name: user.name,
            age: age || 0,
            email: user.email,
            phone: user.phone,
          }
        })

        setDoctors(mappedDoctors)
      } catch (error) {
        console.error("Erro ao buscar médicos:", error)
      }
    }

    fetchDoctors();
  }, []);
  
  const filteredDoctors = useMemo(() => {
    let result = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  
    return result
  }, [doctors, searchTerm])

  const removeDoctor = async () => {
    const response = await RemoveUserById(removeId)

    if (response.message) {
      return ToastError(response.message)
    }

    setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== removeId))
    ToastSuccess('Médico removido com sucesso!')

    setRemoveId(0)
    handleCloseRemoveDoctor()
  }

  return (
    <div className="flex-1">
      <Title text="Médicos" />
      <SubTitle text="Gerenciar médicos e seus históricos" />

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto mb-5">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  Nome
                </div>
              </th>
              <th className="p-3 text-left font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  Telefone
                </div>
              </th>
              <th className="p-3 text-left font-medium text-gray-600">
                <div className="flex items-center gap-1">
                  Email
                </div>
              </th>
              <th className="p-3 text-left font-medium text-gray-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="text-gray-800 flex-1 p-3">{doctor.name}</td>
                <td className="text-gray-800 flex-1 p-3">{doctor.phone}</td>
                <td className="text-gray-800 flex-1 p-3">{doctor.email}</td>
                <td className="p-3 flex gap-2">
                  <button
                    type="button"
                    className={`bg-blue-500 text-white text-xs font-medium py-1.5 px-3 rounded-lg`}
                    onClick={() => navigate(`/doctor/${doctor.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={`bg-red-500 text-white text-xs font-medium py-1.5 px-3 rounded-lg`}
                    onClick={() => handleShowRemoveDoctor(doctor.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {filteredDoctors.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  Nenhum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <button
        type="button"
        className="bg-blue-500 text-white font-medium py-3 px-5 rounded-lg"
        onClick={() => navigate('/doctor/-1')}
        >
          + Adicionar Médico
      </button>

      <Modal centered show={showRemoveDoctor} onHide={handleCloseRemoveDoctor}>
        <Modal.Header>
          <Modal.Title>Remover médico?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Essa ação não pode ser desfeita depois!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseRemoveDoctor}>
            Não
          </Button>
          <Button variant="success" onClick={removeDoctor}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}