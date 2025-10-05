import { FaUsers, FaFileUpload } from 'react-icons/fa'
import { FaUserDoctor } from "react-icons/fa6";
import { FiFileText } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'

export const HomeScreen = ({ navigate }) => {
  const { user } = useAuth()

  const menuItems = [
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

  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo à Tela Inicial</h1>
      <p className="text-base text-gray-600 mb-8">
        Escolha uma das opções abaixo para navegar pelo sistema:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/${item.id}`)}
            className={`flex items-center py-4 px-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-700`}
          >
            <div className="text-2xl text-blue-700">{item.icon}</div>
            <span className="ml-4 text-lg font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
