import { FaHome, FaUsers, FaFileUpload, FaRegClock } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { FiFileText } from 'react-icons/fi'

export const Sidebar = ({ navigate, logout }) => {
  const menuItems = [
    { id: 'home', title: 'Tela Inicial', icon: <FaHome /> },
    { id: 'patients', title: 'Pacientes', icon: <FaUsers /> },
    { id: 'uploadfile', title: 'Enviar Imagem', icon: <FaFileUpload /> },
    { id: 'history', title: 'Histórico de Leituras', icon: <FaRegClock /> },
    { id: 'reports', title: 'Relatórios', icon: <FiFileText /> },
    { id: 'settings', title: 'Configurações', icon: <FaGear /> }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <span className="text-2xl font-bold text-gray-800">OrthoAI</span>
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
