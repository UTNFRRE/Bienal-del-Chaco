import Inicio from './pages/Inicio/Inicio';
import ErrorPage from './pages/Error404';

const routes = [
  
  {
    path: 'escultores',
    element: <Inicio />,
  },
  {
    path: 'eventos',
    element: <ErrorPage />,
  },
  {
    path: 'usuarios',
    element: <ErrorPage />,
  },
  {
    path: 'obras',
    element: <ErrorPage />,
  },
];

export default routes;