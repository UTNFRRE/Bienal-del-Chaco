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
        
        // const roles = data.user.groups[0];
        // localStorage.setItem('userRol', JSON.stringify(roles));

        Cookies.set('access_token', data.accessToken);
        Cookies.set('refresh_token', data.refreshToken);
        
        return data
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
    email: string,
    password: string,
    DateBirth: string,
    ) => {
    
    try {
        const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

  export const getUserId = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${email}`);
        if (response.ok) {
          const data = await response.json();
          Cookies.set('IdUser', data.id);
        return;
        } else {
        throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
  };
  


export const getUserInfo = async () => {
    // const token = Cookies.get('.AspNetCore.Identity.Application');
    const token = Cookies.get('access_token');
    console.log('El token es:')
    console.log(token);
    try {
        const response = await fetch(`${API_URL}/users/info`, {
        method: 'GET',
        // credentials: 'include',
        headers: {
          //  'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        });
        if (response.ok) {
        const data = await response.json();

        Cookies.set('IdUser', data.id);
        Cookies.set('Email', data.email);

        return data;
        } else {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        };
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
} 
