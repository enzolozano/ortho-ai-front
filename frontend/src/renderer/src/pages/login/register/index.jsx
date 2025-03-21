import { useState } from 'react'
import { Title } from '../../../components/Title'
import { SubTitle } from '../../../components/SubTitle'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PostRegister } from '../../../services/authentication'
import { ToastSuccess } from '../../../components/Toast'

export const RegisterScreen = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    verifyPassword(password)

    if (error === '') {
      const response = await PostRegister(username, password)

      if (response?.success) {
        ToastSuccess('Registro realizado com sucesso')
        navigate('/')
      } else {
        setError(response?.message)
      }
    }
  }

  const verifyPassword = (value) => {
    setPassword(value)

    if (value !== confirmedPassword) {
      setError('As senhas devem ser iguais!')
    } else {
      setError('')
    }
  }

  const verifyConfirmedPassword = (value) => {
    setConfirmedPassword(value)

    if (password !== value) {
      setError('As senhas devem ser iguais!')
    } else {
      setError('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 hover:text-blue-600">
          ← Voltar para Login
        </button>
        <Title text="Registro" />
        <SubTitle text="Entre com suas credencias para criar uma nova conta" />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            id="username"
            type="text"
            placeholder="Digite um usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-lg w-full"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => verifyPassword(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            />
            <button
              type="button"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirme a senha"
              value={confirmedPassword}
              onChange={(e) => verifyConfirmedPassword(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            />
            <button
              type="button"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            Registrar
          </button>
        </form>
      </div>
    </div>
  )
}
