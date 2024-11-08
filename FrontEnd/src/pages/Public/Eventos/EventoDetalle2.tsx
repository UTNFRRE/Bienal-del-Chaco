import React, { useEffect, useState } from 'react';
//import Eventos from '../../../API/Admin/Eventos'; // Ajusta la ruta a donde se encuentra tu archivo de datos de eventos
import { useParams } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
//import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { getEventosId } from '../../../API/Public/EventosPu';
import RedesSociales from '../../../components/Redes/RedesSociales';
import marcador from '../../../components/icons/marcador.png';

interface Evento {
  id: string;
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  tematica: string;
  latitud: number;
  longitud: number;
}

const mapContainerStyle = {
  height: '520px',
  width: '920px',
};

const googleMapsApiKey = 'AIzaSyB6cFwxUytgrCP9pqTTEIiLMm477qpJjPs';

export default function EventoDetalle2() {
  const { id } = useParams<{ id: string }>();
  const [evento, setEvento] = useState<Evento | null>(null); // Estado para almacenar el evento
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  if (!id) {
    // Manejo del caso cuando `id` es `undefined`
    return <div>ID no encontrado</div>;
  }

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const eventoData = await getEventosId(id); // Llamada a la API para obtener el evento por ID
        setEvento(eventoData);
        console.log(eventoData);
      } catch (err) {
        setError('Evento no encontrado');
      } finally {
        setLoading(false);
      }
    };
    fetchEvento();
  }, [id]);

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (map && evento) {
      const iconoMarcador = {
        url: marcador,
        scaledSize: new window.google.maps.Size(70, 70),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 40),
      };

      new google.maps.Marker({
        position: { lat: evento.latitud, lng: evento.longitud },
        map,
        icon: iconoMarcador,
      });
    }
  }, [map, evento]);

  if (loading) {
    return <Skeleton height="500px" width="900px" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!evento) {
    return <div>Evento no encontrado</div>;
  }

  const position = {
    lat: evento.latitud,
    lng: evento.longitud,
  };

  const redMarkerIcon = {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
    fillColor: 'red',
    fillOpacity: 1,
    scale: 2,
    strokeColor: 'white',
    strokeWeight: 1,
  };

  return (
    <Flex direction={'row'} gap={4}>
      <Flex mt={6}>
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          loadingElement={<Skeleton height="500px" width="900px" />}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={18}
            onLoad={(mapInstance) => setMap(mapInstance)}
            // onUnmount={onUnmount}
          >
            <Marker position={position} icon={redMarkerIcon} />
          </GoogleMap>
        </LoadScript>
      </Flex>
      <Flex direction={'column'} gap={5} alignItems={'center'} flex={1} mt={6}>
        <Flex direction={'column'} gap={1} textAlign={'center'}>
          <Heading>{evento.nombre}</Heading>
          <Text as={'i'}>{evento.tematica}</Text>
        </Flex>
        <Flex>
          <RedesSociales />
        </Flex>
        <Flex>
          <Text>{evento.descripcion}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
