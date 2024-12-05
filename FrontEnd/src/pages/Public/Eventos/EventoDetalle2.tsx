import React, { useEffect, useState } from 'react';
//import Eventos from '../../../API/Admin/Eventos'; // Ajusta la ruta a donde se encuentra tu archivo de datos de eventos
import { useParams } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  //Button,
  Box,
  //ButtonGroup,
  //IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getEventosId } from '../../../API/Public/EventosPu';
import marcador from '../../../components/icons/marcador.png';
import RedesSocialesBlue from '../../../components/Redes/RedesSocialesBlue';

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
  height: '480px',
  width: '780px',
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
  <Flex direction="column" gap={4} w="100%" h="90vh">
    {/* Franja de fondo azul */}
    <Box
      width="100%"
      height={{ base: "40%", md: "25%"}}
      bg="#0B192C"
      position={{base: "absolute", md: "relative"}}
      zIndex={-5}
      order={{ base: 0, md: 0 }}
      
    >
      <Heading
        display={{ base: "block", md: "none" }}
        color="#CDC2A5"
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        {evento.nombre}
      </Heading>
    </Box>

    <Flex direction={{base: "column", md: "row"}} gap={4} w="100%" h="auto" >
      <Flex mt={{base: 170, md:"-7%"}} ml={6} w={{base: "90%", md:"60%"}} maxWidth={{base: "100%", md: "60%"}} h="50%" zIndex={5} order={{ base: 1, md: 0 }} > {/* el heigth mm*/}
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          loadingElement={<Skeleton height="100%" width="100%" />}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={position}
            zoom={18}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            <Marker position={position} icon={redMarkerIcon} />
          </GoogleMap>
        </LoadScript>
      </Flex>
      <Flex direction="column" gap={5} alignItems="center" flex={1} mt={{ base: 4, md: "-9%" }} ml={{ base: 4, md: "4%" }} mr={{ base: 4, md: "4%" }} fontFamily={'Barlow'} fontSize={16} order={{ base: 2, md: 1 }} >
        <Flex direction="column" gap={1} textAlign="center" >
          <Heading display={{base:"none", md:"block"}} color={'#CDC2A5'}>{evento.nombre}</Heading>
          <Text as="em" color="azul" textAlign={'center'} mt={'50%'} fontWeight={'bold'}>
            Temática: <span style={ { fontWeight: 'normal' }}>{evento.tematica}</span>
          </Text>
        </Flex>
        <Flex>
          <Text textAlign="justify"  mt={'4%'}>{evento.descripcion}</Text>
        </Flex>
        <Flex mt={{ base: 4, md: "20%" }} order={{ base: 3, md: 2 }} >
          <RedesSocialesBlue />
        </Flex>
      </Flex>
    </Flex>
  </Flex>

);
};
