import Inicio from './pages/Inicio/Inicio';
import ErrorPage from './pages/Error404';

const routes = [
  
  {
    path: 'escultores',
    element: <Inicio />,
  },

  {
    path: 'esculturas',
    element: <ErrorPage />,
  },
];

export default routes;