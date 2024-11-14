import { createContext, useState, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';
import { FetchLogin, getUserId} from './API/Login';

interface AuthContextType {
  isAuthenticated: boolean;
    rolUser: string;
  onLogin: (password: string, account: string) => Promise<void>;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [rolUser, setRolUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    (!Cookies.get('access_token') ) ? false : true
  );

  const onLogin = async (password: string, account: string) => {
    try {
      await FetchLogin(password, account);
      await getUserId(account);
      setRolUser(account);
    // setRolUser(JSON.parse(localStorage.getItem('userRol') || '[]'));
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      if (error instanceof Error) {
        throw new Error(
          error.message || 'Error durante el inicio de sesión, intente nuevamente'
        );
      } else {
        throw new Error('Error durante el inicio de sesión, intente nuevamente');
      }
    }
  };

  const onLogout = () => {
    console.log('logout');
    
    // Verificar y eliminar cookies
    const cookiesToRemove = [
      'tokennn',
      'refresh_token',
      'access_expiration',
      'refresh_expiration',
      'username',
      'dni',
      'full_name',
    ];
  
    cookiesToRemove.forEach(cookie => {
      if (Cookies.get(cookie)) {
        Cookies.remove(cookie, { path: '/', domain: window.location.hostname });
        console.log(`Cookie ${cookie} eliminada`);
      } else {
        console.log(`Cookie ${cookie} no encontrada`);
      }
    });
  
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, rolUser ,onLogin, onLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };