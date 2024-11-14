const API_URL = 'http://localhost:5232';
import Cookies from 'js-cookie';

export const FetchLogin = async (password: string, account: string) => {
    const twoFactorCode = '';
    const twoFactorRecoveryCode = '';
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'useCookies': 'false',
          'useSessionCookies': 'false',
        },
        body: JSON.stringify({ email: account ,password, twoFactorCode, twoFactorRecoveryCode }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // const roles = data.user.groups[0];
        // localStorage.setItem('userRol', JSON.stringify(roles));

        Cookies.set('access_token', data.accessToken);
        Cookies.set('refresh_token', data.refreshToken);
        
  
        return data;
      } else {
        const errorResponse = await response.json();
        throw new Error(
           JSON.stringify(errorResponse)
        );
      }
    } catch (error: any) {
      throw new Error('' + error);
    }
  };

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

export const getUserInfo = async () => {
    try {
        const response = await fetch(`${API_URL}/users/info`, {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
        });
        if (response.ok) {
        const data = await response.json();

        Cookies.set('IdUser', data.id);
        Cookies.set('Email', data.email);

        return data;
        }
        throw new Error('Error en la respuesta del servidor');
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
} 
