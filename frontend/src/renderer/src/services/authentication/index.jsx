export async function PostLogin(username, password) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, message: data.detail || 'Erro desconhecido ao fazer login' }
    }
  } catch {
    return { success: false, message: 'Falha na conexão com o servidor' }
  }
}
