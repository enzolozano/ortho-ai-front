export async function PostUser(user) {
    console.log(user)
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/users/', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        
        const data = await response.json()

        if (response.ok) {
            return { success: true, message: 'Usuário adicionado com sucesso' }
        } else {
            return { success: false, message: data.detail || 'Erro desconhecido ao gravar novo usuário' }
        }
    } catch (err) {
        console.error(err)
        return { success:false, message: 'Erro de requisição ao gravar novo usuário' }
    }
}

export async function PutUser(id, user) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        
        const data = await response.json()

        if (response.ok) {
            return { success: true, message: 'Usuário alterado com sucesso' }
        } else {
            return { success: false, message: data.detail || 'Erro desconhecido ao alterar usuário' }
        }
    } catch (err) {
        console.error(err)
        return { success:false, message: 'Erro de requisição ao alterar usuário' }
    }
}

export async function GetPatients() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/users/by_role/0', { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        
        const data = await response.json()

        if (response.ok) {
            return { patients: data }
        } else {
            return { message: data.detail || 'Erro desconhecido ao pesquisar pacientes' }
        }
    } catch (err) {
        console.error(err)
        return { message: 'Erro de requisição ao pesquisar pacientes' }
    }
}

export async function GetPatientsByDoctor(user_id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/patients/by_doctor/${user_id}`, { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        
        const data = await response.json()

        if (response.ok) {
            return { patients: data }
        } else {
            return { message: data.detail || 'Erro desconhecido ao pesquisar pacientes' }
        }
    } catch (err) {
        console.error(err)
        return { message: 'Erro de requisição ao pesquisar pacientes' }
    }
}

export async function GetDoctors() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/users/by_role/1', { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        
        const data = await response.json()

        if (response.ok) {
            return { doctors: data }
        } else {
            return { message: data.detail || 'Erro desconhecido ao pesquisar médicos' }
        }
    } catch (err) {
        console.error(err)
        return { message: 'Erro de requisição ao pesquisar médicos' }
    }
}

export async function GetUserById(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()

        if (response.ok) {
            return data
        } else {
            return { message: data.detailt || `Erro desconhecido ao pesquisar usuário de id ${id}` }
        }
    } catch (err) {
        console.error(err)
        return { message: `Erro de requisição ao pesquisar usuário de id ${id}` }
    }
}

export async function RemoveUserById(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()

        if (response.ok) {
            return { patient: data }
        } else {
            return { message: data.detailt || `Erro desconhecido ao remover usuário de id ${id}` }
        }
    } catch (err) {
        console.error(err)
        return { message: `Erro de requisição ao remover usuário de id ${id}` }
    }
}