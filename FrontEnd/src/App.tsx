import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { useAuth } from './Context';
import Auth from './layout/Auth';
import Admin from './layout/Admin';
import Public from './layout/Public';
import User from './layout/User';
import theme from './theme/theme';

function App() {
  useEffect(() => {
    document.title = 'Bienal del Chaco';
  }, []);

  // const { isAuthenticated } = useAuth();

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
           <Route path="/auth/*" element={<Auth />} />
           <Route path="/admin/*" element={<Admin />} />
           <Route
              path="/admin/"
              element={
                <Navigate
                  replace
                  to='/admin/escultores' 
                />
              }
            />
           <Route path="/public/*" element={<Public />} />
           <Route
              path="/public/"
              element={
                <Navigate
                  replace
                  to='/public/eventos' 
                />
              }
            />
            <Route path="/user/*" element={<User />} />
        
           <Route
              path="/*"
              element={
                <Navigate
                  replace
                  to='/auth/' 
                />
              }
            />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
