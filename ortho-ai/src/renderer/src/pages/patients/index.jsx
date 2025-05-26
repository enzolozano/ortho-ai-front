import { useState, useMemo } from 'react'
import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'
import { ToastWarning, ToastSuccess } from '../../components/Toast'

export const PatientsScreen = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Ana Silva', age: 45, condition: 'Grau elevado' },
    { id: 2, name: 'Carlos Mendes', age: 62, condition: 'Grau elevado' },
    { id: 3, name: 'Mariana Costa', age: 38, condition: 'Grau leve' },
    { id: 4, name: 'João Ferreira', age: 55, condition: 'Sem curvatura' },
    { id: 5, name: 'Lúcia Santos', age: 42, condition: 'Sem curvatura' }
  ])

  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  const [removeId, setRemoveId] = useState(0)

  const [showAddPatient, setShowAddPatient] = useState(false)
  const [showRemovePatient, setShowRemovePatient] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const handleCloseAddPatient = () => setShowAddPatient(false)
  const handleShowAddPatient = () => setShowAddPatient(true)

  const handleCloseRemovePatient = () => setShowRemovePatient(false)
  const handleShowRemovePatient = (id) => {
    setRemoveId(id)
    setShowRemovePatient(true)
  }
  
  const filteredPatients = useMemo(() => {
    let result = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.age.toString().includes(searchTerm) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  
    return result
  }, [patients, searchTerm])

  const removePatient = () => {
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== removeId))
    ToastSuccess('Paciente removido com sucesso!')

    setRemoveId(0)
    handleCloseRemovePatient()
  }

  const addPatient = () => {
    if (!name) {
      ToastWarning('Preencha o campo de nome!')
      return
    }

    if (!age) {
      ToastWarning('Preencha o campo de idade!')
      return
    }

    const newPatient = {
      id: patients.length > 0 ? patients[patients.length - 1].id + 1 : 1,
      name: name,
      age: parseInt(age, 10),
      condition: 'Não avaliado'
    }

    setPatients([...patients, newPatient])
    setName('')
    setAge(0)

    handleCloseAddPatient()
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
                  Condição
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
                <td className="text-gray-800 flex-1 p-3">{patient.condition}</td>
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
        onClick={handleShowAddPatient}
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

      <Modal centered show={showAddPatient} onHide={handleCloseAddPatient}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="font-semibold">Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do paciente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="font-semibold">Idade</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Digite a idade do paciente"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPatient}>
            Fechar
          </Button>
          <Button variant="primary" onClick={addPatient}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
