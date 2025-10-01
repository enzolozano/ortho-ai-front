export async function GetAuthByUserId(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/auth/by_user/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, message: data.detail || 'Erro desconhecido ao pesquisar autenticação do usuário' }
    }
  } catch {
    return { success: false, message: 'Falha na conexão com o servidor' }
  }
}

export async function DeleteAuth(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/auth/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, message: data.detail || 'Erro desconhecido ao deletar a autenticação do usuário' }
    }
  } catch {
    return { success: false, message: 'Falha na conexão com o servidor' }
  }
}

export async function PostLogin(username, password) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, user_id: data.user_id }
    } else {
      return { success: false, message: data.detail || 'Erro desconhecido ao fazer login' }
    }
  } catch {
    return { success: false, message: 'Falha na conexão com o servidor' }
  }
}

export async function PostRegister(user_id, username, password) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, username, password })
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, message: 'Autenticação criada com sucesso' }
    } else {
      return { success: false, message: data.detail || 'Erro desconhecido ao fazer registro' }
    }
  } catch {
    return { success: false, message: 'Falha na conexão com o servidor' }
  }
}
