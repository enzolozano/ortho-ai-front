import { createContext, useContext, useState } from 'react'
import { PostLogin } from '../../services/authentication'
import { GetUserById } from '../../services/users'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    const loginResponse = await PostLogin(username, password)

    if (loginResponse.success && loginResponse?.user_id) {
      const userResponse = await GetUserById(loginResponse.user_id)
      setUser(userResponse)
      setIsAuthenticated(true)
    }

    return loginResponse
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
