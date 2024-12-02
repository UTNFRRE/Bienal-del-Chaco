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
        await AddRoltoUser(email, 'user'); 
        return true;
        } else {
        return false;
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
    };

  export const AddRoltoUser = async (
    email: string,
    roleName: string,
    ) => {
    
    try {
        const response = await fetch(`${API_URL}/api/Roles/AsignarRol?email=${email}&rolename=${roleName}`, {
        method: 'POST',
        });
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
  }  ;

  export const getUserId = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}/Usuarios/InfoUsuario?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          Cookies.set('IdUser', data.userId);
        return data;
        } else {
        throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
  };

export const GetUsuarios = async () => {
    try {
        const response = await fetch(`${API_URL}/Usuarios`);
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

export const GetRoles = async () => {
    try {
        const response = await fetch(`${API_URL}/api/Roles/Lista de Roles`);
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