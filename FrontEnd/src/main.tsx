import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './LoginContexto';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <ChakraProvider>
        <App />
        </ChakraProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
