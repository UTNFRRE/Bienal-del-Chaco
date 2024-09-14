import Escultoress from './pages/Public/Escultores/Escultores';
import ErrorPage from './pages/Error404';
import Eventos from './pages/Admin/Eventos';
import ObrasPublic from './pages/Public/Obras/Obras';
import ObraDetail from './pages/Public/Obras/ObraDetalle';

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
    element: <ObrasPublic />,
    title: 'Obras',
    rol: 'public',
  },
  {
    path: 'obras/:id', // Se agrega el id de la obra
    element: <ObraDetail />,
    title: '',
    rol: 'public',
  },
];

export default routes;