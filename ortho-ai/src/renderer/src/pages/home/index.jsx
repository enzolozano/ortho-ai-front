export const HomeScreen = () => {
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo à Tela Inicial</h1>
      <p className="text-base text-gray-600 mb-8">
        Selecione uma opção no menu lateral para navegar
      </p>

      <div className="bg-white rounded-lg p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Resumo</h2>
        <div className="flex justify-between">
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl font-bold text-blue-700 mb-1">24</span>
            <span className="text-sm text-gray-600">Pacientes Ativos</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl font-bold text-blue-700 mb-1">156</span>
            <span className="text-sm text-gray-600">Leituras</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl font-bold text-blue-700 mb-1">12</span>
            <span className="text-sm text-gray-600">Pendentes</span>
          </div>
        </div>
      </div>
    </div>
  )
}
