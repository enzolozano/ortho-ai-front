import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext/index'
import { useEffect, useState } from 'react'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true })
    } else {
      setIsChecking(false)
    }
  }, [isAuthenticated, navigate])

  if (isChecking) {
    return <div>Verificando...</div>
  }

  return children
}
