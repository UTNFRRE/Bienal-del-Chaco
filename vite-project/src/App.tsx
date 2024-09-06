import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { useAuth } from './Context';
// import Auth from './layouts/Auth';
import Admin from './layout/Admin';
import theme from './theme/theme';

function App() {
  useEffect(() => {
    document.title = 'Bienal Admin';
  }, []);

  // const { isAuthenticated } = useAuth();

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
           <Route path="/admin/*" element={<Admin />} />
          <Route
            path="/*"
            element={
              <Navigate
                replace
                to='/admin/escultores' 
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
