import { useState, useMemo, useEffect } from 'react'
import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'
import { ToastError, ToastWarning, ToastSuccess } from '../../components/Toast'
import { GetPatients, RemovePatientById } from '../../services/users'

export const PatientsScreen = () => {
  const [patients, setPatients] = useState([])

  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  const [removeId, setRemoveId] = useState(0)

  const [showAddPatient, setShowAddPatient] = useState(false)
  const [showRemovePatient, setShowRemovePatient] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const handleCloseRemovePatient = () => setShowRemovePatient(false)
  const handleShowRemovePatient = (id) => {
    setRemoveId(id)
    setShowRemovePatient(true)
  }

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await GetPatients()

        if (response.message) {
          return ToastError(response.message)
        }

        const mappedPatients = response.patients.map(user => {
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

        setPatients(mappedPatients)
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error)
      }
    }

    fetchPatients();
  }, []);
  
  const filteredPatients = useMemo(() => {
    let result = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age.toString().includes(searchTerm) ||
        patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  
    return result
  }, [patients, searchTerm])

  const removePatient = async () => {
    const response = await RemovePatientById(removeId)

    if (response.message) {
      return ToastError(response.message)
    }

    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== removeId))
    ToastSuccess('Paciente removido com sucesso!')

    setRemoveId(0)
    handleCloseRemovePatient()
  }

  return (
    <div className="flex-1">
      <Title text="Pacientes" />
      <SubTitle text="Gerenciar pacientes e seus históricos" />

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
                  Idade
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
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="text-gray-800 flex-1 p-3">{patient.name}</td>
                <td className="text-gray-800 flex-1 p-3">{patient.age}</td>
                <td className="text-gray-800 flex-1 p-3">{patient.phone}</td>
                <td className="text-gray-800 flex-1 p-3">{patient.email}</td>
                <td className="p-3 flex gap-2">
                  <button
                    type="button"
                    className={`bg-blue-500 text-white text-xs font-medium py-1.5 px-3 rounded-lg`}
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={`bg-red-500 text-white text-xs font-medium py-1.5 px-3 rounded-lg`}
                    onClick={() => handleShowRemovePatient(patient.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
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
        onClick={() => navigate('/patient/-1')}
      >
        + Adicionar Paciente
      </button>

      <Modal centered show={showRemovePatient} onHide={handleCloseRemovePatient}>
        <Modal.Header>
          <Modal.Title>Remover paciente?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Essa ação não pode ser desfeita depois!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseRemovePatient}>
            Não
          </Button>
          <Button variant="success" onClick={removePatient}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
