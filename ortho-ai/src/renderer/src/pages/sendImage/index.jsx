import { useEffect, useState } from "react"
import { AnalyseImage } from "../../services/image"
import { GetPatientsByDoctor } from "../../services/users"
import { useAuth } from "../../contexts/AuthContext"
import { ResultModal } from "./resultModal"
import { ToastWarning, ToastError } from "../../components/Toast"

export const SendImageScreen = () => {
  const [image, setImage] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState("")
  const [patients, setPatients] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user?.id) return

      setIsLoadingPatients(true)
      const result = await GetPatientsByDoctor(user.id)

      if (result.patients) {
        setPatients(result.patients)
        setErrorMessage("")
      } else {
        setErrorMessage(result.message || "Erro ao carregar pacientes")
      }

      setIsLoadingPatients(false)
    }

    fetchPatients()
  }, [user])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSend = async () => {
    if (!selectedPatient || !image) {
      return ToastWarning("Selecione um paciente e uma imagem antes de enviar.")
    }

    setIsSending(true)

    const fileInput = document.querySelector("#imageInput")
    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append("file", file)

    const data = await AnalyseImage(formData)

    if (!data.success) {
      return ToastError('Erro desconhecido ao tentar analisar a imagem enviada.')
    }

    const patientData = patients.find((p) => p.id === Number(selectedPatient))

    setAnalysisResult({
      analysedImageBase64: data.result.image_base64,
      cobbAngle: data.result.cobb_angle,
      patient: patientData
    })

    setModalOpen(true)
    setIsSending(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Análise de Imagem</h2>

        {/* Selecionar Paciente */}
        {isLoadingPatients ? (
          <p className="text-center text-gray-500 mb-4">Carregando pacientes...</p>
        ) : errorMessage ? (
          <p className="text-center text-red-600 mb-4">{errorMessage}</p>
        ) : patients.length === 0 ? (
          <p className="text-center text-gray-500 mb-4">Nenhum paciente encontrado.</p>
        ) : (
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="mb-4 w-full border p-2 rounded-lg"
          >
            <option value="">Selecione o paciente</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        {/* Upload da Imagem */}
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full border p-2 rounded-lg cursor-pointer"
        />

        {/* Pré-visualização */}
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="preview"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Botão de Envio */}
        <button
          onClick={handleSend}
          disabled={isSending || !selectedPatient || !image}
          className={`mt-4 w-full py-2 rounded-lg text-white transition-colors ${
            isSending || !selectedPatient || !image
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSending ? "Enviando..." : "Enviar Imagem"}
        </button>

        {analysisResult && (
          <ResultModal
            show={modalOpen}
            onHide={() => setModalOpen(false)}
            analysedImageBase64={analysisResult.analysedImageBase64}
            cobbAngle={analysisResult.cobbAngle}
            patient={analysisResult.patient}
            doctor={user}
          />
        )}
      </div>
    </div>
  )
}
