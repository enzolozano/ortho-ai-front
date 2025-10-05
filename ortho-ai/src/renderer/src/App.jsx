import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext/index'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Sidebar } from './components/Sidebar/index'
import { LoginScreen } from './pages/login'
import { HomeScreen } from './pages/home'
import { PatientsScreen } from './pages/patients'
import { PatientScreen } from './pages/patients/editPatient'
import { DoctorsScreen } from './pages/doctors'
import { DoctorScreen } from './pages/doctors/editDoctor'
import { SendImageScreen } from './pages/sendImage'
import { ToastContainer } from 'react-toastify'

export const App = () => {
  return (
    <Router>
      <ToastContainer pauseOnFocusLoss={false} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <LayoutWithNavigate>
                  {(navigate) => <HomeScreen navigate={navigate} />}
                </LayoutWithNavigate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Layout>
                  <PatientsScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <PatientScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorsScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/uploadfile"
            element={
              <ProtectedRoute>
                <Layout>
                  <SendImageScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar navigate={navigate} logout={logout} />
      <div className="flex-1 p-5 overflow-y-auto">{children}</div>
    </div>
  )
}

// versão especial do layout que passa navigate como função render
const LayoutWithNavigate = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar navigate={navigate} logout={logout} />
      <div className="flex-1 p-5 overflow-y-auto">
        {children(navigate)}
      </div>
    </div>
  )
}
