import Inicio from './pages/Public/Inicio/Inicio';
import ErrorPage from './pages/Error404';
import Eventos from './pages/Admin/Eventos';
import ObrasPublic from './pages/Public/Obras/Obras';
import ObrasAdmin from './pages/Admin/Obras/ObrasAd';

const routes = [
  
  {
    path: 'escultores',
    title: 'Escultores',
    element: <Inicio />,
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
    element: <ObrasAdmin />,
    title: 'Obras',
    rol: 'admin',
  },
  {
    path: 'escultores',
    element: <Inicio />,
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
    element: <ObrasPublic />,
    title: 'Obras',
    rol: 'public',
  },

];

export default routes;