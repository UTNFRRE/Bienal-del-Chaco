import Escultoress from './pages/Public/Escultores/Escultores';
import EscultorDetail from './pages/Public/Escultores/EscultorDetalle';
import ErrorPage from './pages/Error404';
import Eventos from './pages/Admin/Eventos';
import EventoDetalle from './pages/Public/Eventos/EventoDetalle';
import EventoDetalle2 from './pages/Public/Eventos/EventoDetalle2';
import EventosPublic from './pages/Public/Eventos/Eventos';
import Escultores from './pages/Admin/Escultores';
import ObrasPublic from './pages/Public/Obras/Obras';
import ObraDetail from './pages/Public/Obras/ObraDetalle';
import ObrasAdmin from './pages/Admin/Obras/ObrasAd';
import ManagerVotes from './pages/Admin/ManagerVotes';
import Voted from  './pages/Votacion';
import { RiOilLine } from 'react-icons/ri';
import obras from './API/ObrasVote';

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
    element: <ObrasAdmin />,
    title: 'Obras',
    rol: 'admin',
  },
  {
    path: 'vote',
    element: <ManagerVotes />,
    title: 'Votaciones',
    rol: 'admin',
  },
  {
    path: 'escultores',
    element: <Escultoress />,
    title: 'Escultores',
    rol: 'public',
  },
  {
    path: 'escultores',
    element: <Escultoress />,
    title: 'Escultores',
    rol: 'user',
  },
  {
    path: 'eventos',
    element: <EventosPublic />,
    title: 'Eventos',
    rol: 'public',
  },
  {
    path: 'eventos',
    element: <EventosPublic />,
    title: 'Eventos',
    rol: 'user',
  },
  {
    path: 'eventos/:id',
    element: <EventoDetalle2 />,
    title: '',
    rol: 'public',
  },
  {
    path: 'eventos/:id',
    element: <EventoDetalle2 />,
    title: '',
    rol: 'user',
  },
  {
    path: 'obras',
    element: <ObrasPublic />,
    title: 'Obras',
    rol: 'public',
  },
  {
    path: 'escultores/:id',
    element: <EscultorDetail />,
    title: '',
    rol: 'public',
  },
  {
    path: 'escultores/:id',
    element: <EscultorDetail />,
    title: '',
    rol: 'user',
  },
  {
    path: 'obras/:id', // Se agrega el id de la obra
    element: <ObraDetail />,
    title: '',
    rol: 'public',
  },
  {
    path: 'voting/:id/:userId',
    element: <Voted />,
    title: '',
    rol: 'user',
  },
  {
    path: 'obras',
    element: <ObrasPublic/>,
    title: 'Obras',
    rol: 'user',
  },
  {
    path: 'obras/:id', // Se agrega el id de la obra
    element: <ObraDetail />,
    title: '',
    rol: 'user',
  },
];

export default routes;
