import { useParams } from 'react-router-dom'

export const PatientScreen = () => {
  const { id } = useParams()

  return <label>Id do usuário:{id}</label>
}
