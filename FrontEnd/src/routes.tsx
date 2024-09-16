import Escultoress from './pages/Public/Escultores/Escultores';
import EscultorDetail from './pages/Public/Escultores/EscultorDetalle';
import ErrorPage from './pages/Error404';
import Eventos from './pages/Admin/Eventos';

const routes = [
  
  {
    path: 'escultores',
    title: 'Escultores',
    element: <ErrorPage />,
    rol: 'admin',
  },
  {
    path: 'eventos',
    element: <Eventos />,
    title: 'Eventos',
    rol: 'admin',
  },
  {
    path: 'usuarios',
    element: <ErrorPage />,
    title: 'Usuarios',
    rol: 'admin',
  },
  {
    path: 'obras',
    element: <ErrorPage />,
    title: 'Obras',
    rol: 'admin',
  },
  {
    path: 'escultores',
    element: <Escultoress />,
    title: 'Escultores',
    rol: 'public',
  },
  {
    path: 'eventos',
    element: <ErrorPage />,
    title: 'Eventos',
    rol: 'public',
  },
  {
    path: 'obras',
    element: <ErrorPage />,
    title: 'Obras',
    rol: 'public',
  },
  {
    path: 'escultores/:dni',
    element: <EscultorDetail />,
    title: '',
    rol: 'public',
  },

];

export default routes;