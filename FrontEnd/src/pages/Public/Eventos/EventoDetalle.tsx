import Eventos from '../../../API/Admin/Eventos'; // Adjust the path to where your events data is located
import { useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Asegúrate de que la ruta del icono sea correcta
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Configuración del icono de Leaflet
const icon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  lugar: string;
  tematica: string;
}

export default function EventoDetalle() {
  const { id } = useParams<{ id: string }>();

  const evento = Eventos.find((evento: Evento) => evento.id === Number(id));

  return (
    <Flex direction={'column'} gap={10}>
      <h1>{evento?.titulo}</h1>
      <p>{evento?.fecha}</p>
      <p>{evento?.descripcion}</p>
      <p>{evento?.lugar}</p>
      <p>{evento?.tematica}</p>
      {evento && (
        <MapContainer
          center={[evento.latitud, evento.longitud]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[evento.latitud, evento.longitud]} icon={icon}>
            <Popup>{evento.lugar}</Popup>
          </Marker>
        </MapContainer>
      )}
    </Flex>
  );
}
