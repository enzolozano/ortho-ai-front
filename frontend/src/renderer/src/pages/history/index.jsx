export const HistoryScreen = () => {
  const readings = [
    {
      id: 1,
      patientName: 'Ana Silva',
      date: '15/05/2023',
      type: 'Pressão Arterial',
      value: '120/80 mmHg'
    },
    {
      id: 2,
      patientName: 'Carlos Mendes',
      date: '14/05/2023',
      type: 'Glicemia',
      value: '110 mg/dL'
    },
    {
      id: 3,
      patientName: 'Mariana Costa',
      date: '13/05/2023',
      type: 'Oximetria',
      value: '98%'
    },
    {
      id: 4,
      patientName: 'João Ferreira',
      date: '12/05/2023',
      type: 'Temperatura',
      value: '36.5°C'
    },
    {
      id: 5,
      patientName: 'Lúcia Santos',
      date: '11/05/2023',
      type: 'Pressão Arterial',
      value: '130/85 mmHg'
    },
    {
      id: 6,
      patientName: 'Ana Silva',
      date: '10/05/2023',
      type: 'Glicemia',
      value: '105 mg/dL'
    },
    {
      id: 7,
      patientName: 'Carlos Mendes',
      date: '09/05/2023',
      type: 'Oximetria',
      value: '97%'
    }
  ]

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Histórico de Leituras</h1>
      <p className="text-base text-gray-600 mb-8">Visualize todas as leituras realizadas</p>

      <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-180px)]">
        <div className="flex py-3.5 px-4 bg-gray-100 rounded-t-lg">
          <span className="font-semibold text-gray-700 flex-1">Paciente</span>
          <span className="font-semibold text-gray-700 flex-1">Data</span>
          <span className="font-semibold text-gray-700 flex-1">Tipo</span>
          <span className="font-semibold text-gray-700 flex-1">Valor</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {readings.map((reading) => (
            <div key={reading.id} className="flex py-3.5 px-4">
              <span className="text-gray-800 flex-1">{reading.patientName}</span>
              <span className="text-gray-800 flex-1">{reading.date}</span>
              <span className="text-gray-800 flex-1">{reading.type}</span>
              <span className="text-gray-800 font-medium flex-1">{reading.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
