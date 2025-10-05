export async function AnalyseImage(formData) {
  try {
    const response = await fetch("http://127.0.0.1:8000/process_image/", {
      method: "POST",
      body: formData
    });

    const data = await response.json()
    
    return { success: true, result: data }
  } catch {
    return { success: false }
  }
}