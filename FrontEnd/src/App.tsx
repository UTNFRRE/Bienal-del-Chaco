import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { useAuth } from './Context';
import { EdicionProvider } from './EdicionContexto';
import Auth from './layout/Auth';
import Admin from './layout/Admin';
import Public from './layout/Public';
import User from './layout/User';
import Register from './layout/Registro';
import theme from './theme/theme';
import Vote from './layout/Vote';

const BlackTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
});

const LightTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      },
    },
  },
});

function App() {
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    document.title = 'Bienal del Chaco';
  }, []);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === theme ? BlackTheme : theme);
  };

  // const { isAuthenticated } = useAuth();

  return (
    <ChakraProvider theme={currentTheme}>
      <EdicionProvider>
        <BrowserRouter>
          <button
          onClick={toggleTheme}
          style={{
            padding: '10px 10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          >
          <img
            src="/dark.jpg"
            alt="Luna"
            style={{
            width: '20px',
            height: '20px',
            }}
          />
          </button>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/voting/" element={<Vote />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route
              path="/admin/"
              element={<Navigate replace to="/admin/escultores" />}
            />
            <Route path="/public/*" element={<Public />} />
            <Route
              path="/public/"
              element={<Navigate replace to="/public/eventos" />}
            />
            <Route path="/user/*" element={<User />} />
            <Route
              path="/*"
              element={<Navigate replace to="/auth/" />}
            />
          </Routes>
        </BrowserRouter>
      </EdicionProvider>
    </ChakraProvider>
  );
}

export default App;
