import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { Footer } from '../../components/Footer'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import backgroundImage from '../../assets/background.jpg'

export const LoginScreen = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const response = await login(username, password)

    if (response?.success) {
      navigate('/home')
    } else {
      setError(response?.message || 'Usuário ou senha incorretos')
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <Title text="Login" />
        <SubTitle text="Entre com suas credenciais para acessar sua conta" />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded-lg w-full"
            required
          >
            <option value="">Selecione o tipo de usuário</option>
            <option value="patient">Paciente</option>
            <option value="doctor">Médico</option>
            <option value="admin">Administrador</option>
          </select>
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
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-3 px-5 rounded-lg"
            color="blue"
          >
            Enviar
          </button>
          <Footer text={`© ${new Date().getFullYear()} - Todos os direitos reservados`} />
        </form>
      </div>
    </div>
  )
}
