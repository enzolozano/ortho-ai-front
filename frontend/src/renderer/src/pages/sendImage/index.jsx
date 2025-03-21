import { useState } from 'react'

export const SendImageScreen = () => {
  const [image, setImage] = useState(null)

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center"> Upload de Imagem </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full border p-2 rounded-lg cursor-pointer"
        />
        {image && (
          <div className="mt-4">
            <img src={image} alt="preview" className="w-full h-auto rounded-lg shadow-sm" />
          </div>
        )}
      </div>
    </div>
  )
}
