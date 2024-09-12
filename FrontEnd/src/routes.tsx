import Inicio from './pages/Public/Inicio/Inicio';
import ErrorPage from './pages/Error404';
import Eventos from './pages/Admin/Eventos';
import Escultores from './pages/Admin/Escultores';

const routes = [
  {
    path: 'escultores',
    element: <Escultores />,
    title: 'Escultores',
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
    element: <ErrorPage />,
    title: 'Obras',
    rol: 'public',
  },

];

export default routes;