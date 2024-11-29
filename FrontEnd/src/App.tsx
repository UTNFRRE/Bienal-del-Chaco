import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EdicionProvider } from './EdicionContexto';
import { useAuth } from './LoginContexto';
import Auth from './layout/Auth';
import Admin from './layout/Admin';
import Empleado from './layout/Empleado';
import Public from './layout/Public';
import User from './layout/User';
import Register from './layout/Registro';
import theme from './theme/theme';
// import Vote from  './layout/Vote';

function App() {
  useEffect(() => {
    document.title = 'Bienal del Chaco';
  }, []);

  const { isAuthenticated, rolUser } = useAuth();
  const isAdmin = rolUser.includes('admin') 
  const isUser = rolUser.includes('user');
  const isEmpleado = rolUser.includes('empleado');
 
  return (
    <ChakraProvider theme={theme}>
        <EdicionProvider>
          <BrowserRouter>
        <Routes>
           <Route path="/auth/*" element={<Auth />} />
            <Route path="/registro" element={<Register />} />
           <Route path="/public/*" element={<Public />} />
            {isAuthenticated && isAdmin && (
           <Route path="/admin/*" element={<Admin />} /> )}
            {isAuthenticated && isUser && (
            <Route path="/user/*" element={<User />} /> )}
            {isAuthenticated && isEmpleado && (
            <Route path="/empleado/*" element={<Empleado />} /> )}
        <Route
            path="/*"
            element={
              <Navigate
                replace
                to={
                  isAuthenticated
                    ? isAdmin
                      ? '/admin/escultores'
                      : isUser ? '/user/escultores' 
                      : isEmpleado ? '/empleado/obras' : '/auth/'
                    : '/auth/'
                }
          />
        }
        />
        </Routes>
      </BrowserRouter>
      </EdicionProvider>
    </ChakraProvider>
  );
}

export default App;
