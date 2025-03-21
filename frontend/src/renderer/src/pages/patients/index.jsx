import { useState } from 'react'
import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { GridItemHeader } from '../../components/GridItemHeader'
import { GridItem } from '../../components/GridItem'
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
  const navigate = useNavigate()

  const handleCloseAddPatient = () => setShowAddPatient(false)
  const handleShowAddPatient = () => setShowAddPatient(true)

  const handleCloseRemovePatient = () => setShowRemovePatient(false)
  const handleShowRemovePatient = (id) => {
    setRemoveId(id)
    setShowRemovePatient(true)
  }

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

      <div className="bg-white rounded-lg shadow-sm mb-5">
        <div className="flex py-3 px-4 bg-gray-100 rounded-t-lg border-b border-gray-200">
          <GridItemHeader text="Nome" />
          <GridItemHeader text="Idade" />
          <GridItemHeader text="Condição" />
          <GridItemHeader />
        </div>

        <div className="divide-y divide-gray-100">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center py-3.5 px-4">
              <GridItem item={patient.name} />
              <GridItem item={patient.age} />
              <GridItem item={patient.condition} />
              <div className="flex-1 flex gap-2">
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
              </div>
            </div>
          ))}
        </div>
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
