export async function PostPatient(patient) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/users/', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient)
        })
        
        const data = await response.json()

        if (response.ok) {
            return { success: true, message: 'Paciente adicionado com sucesso' }
        } else {
            return { success: false, message: data.detail || 'Erro desconhecido ao gravar novo paciente' }
        }
    } catch (err) {
        console.error(err)
        return { success:false, message: 'Erro de requisição ao gravar novo paciente' }
    }
}

export async function PutPatient(id, patient) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient)
        })
        
        const data = await response.json()

        if (response.ok) {
            return { success: true, message: 'Paciente alterado com sucesso' }
        } else {
            return { success: false, message: data.detail || 'Erro desconhecido ao alterar paciente' }
        }
    } catch (err) {
        console.error(err)
        return { success:false, message: 'Erro de requisição ao alterar paciente' }
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

export async function GetPatientById(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()

        if (response.ok) {
            return { patient: data }
        } else {
            return { message: data.detailt || `Erro desconhecido ao pesquisar paciente de id ${id}` }
        }
    } catch (err) {
        console.error(err)
        return { message: `Erro de requisição ao pesquisar paciente de id ${id}` }
    }
}

export async function RemovePatientById(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()

        if (response.ok) {
            return { patient: data }
        } else {
            return { message: data.detailt || `Erro desconhecido ao remover paciente de id ${id}` }
        }
    } catch (err) {
        console.error(err)
        return { message: `Erro de requisição ao remover paciente de id ${id}` }
    }
}