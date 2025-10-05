import { FaHome, FaUsers, FaFileUpload } from 'react-icons/fa'
import { FaUserDoctor } from "react-icons/fa6";
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/logo.png'

export const Sidebar = ({ navigate, logout }) => {
  const { user } = useAuth()

  const menuItems = [
    { id: 'home', title: 'Tela Inicial', icon: <FaHome /> },
    { id: 'patients', title: 'Pacientes', icon: <FaUsers /> },
    { id: 'uploadfile', title: 'Enviar Imagem', icon: <FaFileUpload /> },
  ]

  if (user?.role === 2) {
    const patientsIndex = menuItems.findIndex(item => item.id === 'patients')
    menuItems.splice(patientsIndex + 1, 0, {
      id: 'doctors',
      title: 'Médicos',
      icon: <FaUserDoctor />
    })

    const uploadFileIndex = menuItems.findIndex(item => item.id === 'uploadfile')
    if (uploadFileIndex !== -1) {
      menuItems.splice(uploadFileIndex, 1)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <img src={logo} alt="OrthoAI" />
      </div>
      <div className="mt-5 flex flex-col">
        {menuItems.map((item) => {
          return (
            <button
              key={item.id}
              className={`flex items-center py-3 px-5 mx-2.5 mb-1 rounded-lg text-left ${
                window.location.pathname === `/${item.id}`
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => navigate(`/${item.id}`)}
            >
              {item.icon}
              <span
                className={`ml-3 text-base ${window.location.pathname === `/${item.id}` ? 'font-semibold' : ''}`}
              >
                {item.title}
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-auto p-5">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-5 mt-5 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
