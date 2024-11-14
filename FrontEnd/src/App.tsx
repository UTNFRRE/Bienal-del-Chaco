import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { useAuth } from './Context';
import { EdicionProvider } from './EdicionContexto';
import { useAuth } from './LoginContexto';
import Auth from './layout/Auth';
import Admin from './layout/Admin';
import Public from './layout/Public';
import User from './layout/User';
import Register from './layout/Registro';
import theme from './theme/theme';
import Vote from  './layout/Vote';

function App() {
  useEffect(() => {
    document.title = 'Bienal del Chaco';
  }, []);

  const { isAuthenticated, rolUser } = useAuth();
  const isAdmin = rolUser.includes('admin@admin.com') 
  const isUser = !rolUser.includes('admin@admin.com');

  return (
    <ChakraProvider theme={theme}>
        <EdicionProvider>
          <BrowserRouter>
        <Routes>
           <Route path="/auth/*" element={<Auth />} />
           {/* <Route path="/voting/" element={<Vote />} />   */}
           <Route path="/public/*" element={<Public />} />
           {isAuthenticated && isAdmin && (
           <Route path="/admin/*" element={<Admin />} /> )}
           {/* <Route
              path="/admin/"
              element={
                <Navigate
                  replace
                  to='/admin/escultores' 
                />
              }
            /> */}
           <Route
              path="/public/"
              element={
                <Navigate
                  replace
                  to='/public/eventos' 
                />
              }
            />
            { isAuthenticated && isUser && (
              <Route path="/user/*" element={<User />} /> )}
        
            <Route
              path="/*"
              element={
                <Navigate
                  replace
                  to='/public/' 
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
