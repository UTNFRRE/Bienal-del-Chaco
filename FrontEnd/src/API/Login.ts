const API_URL = 'http://localhost:5232';

export const AddUser = async (
    FullName: string,
    UserName: string,
    Email: string,
    Password: string,
    DateBirth: string,
    ) => {
    const formData = new FormData();
    formData.append('UserName', UserName);
    formData.append('Email', Email);
    formData.append('Password', Password);
    formData.append('FullName', FullName);
    formData.append('DateOfBirth', DateBirth);
    
    try {
        const response = await fetch(`${API_URL}/Usuarios/create`, {
        method: 'POST',
        body: formData,
        });
        if (response.ok) {
        const data = await response.json();
        return data;
        } else {
        throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
    };