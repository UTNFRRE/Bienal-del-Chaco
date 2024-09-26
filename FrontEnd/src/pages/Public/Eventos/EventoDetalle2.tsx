import React from "react";
import Eventos from '../../../API/Admin/Eventos'; // Ajusta la ruta a donde se encuentra tu archivo de datos de eventos
import { useParams } from "react-router-dom";
import { Flex, Heading, Text, Button, ButtonGroup, IconButton} from "@chakra-ui/react";
import { GoogleMap, LoadScript, Marker  } from "@react-google-maps/api";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';


interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  lugar: string;
  tematica: string;
  latitud: number;
  longitud: number;
}

const mapContainerStyle = {
  height: "500px",
  width: "900px",
};

const googleMapsApiKey = "AIzaSyB6cFwxUytgrCP9pqTTEIiLMm477qpJjPs"; 

export default function EventoDetalle2() {
  const { id } = useParams<{ id: string }>();

  const evento = Eventos.find((evento: Evento) => evento.id === Number(id));

  if (!evento) {
    return <div>Evento no encontrado</div>;
  }

  const position = {
    lat: evento.latitud,
    lng: evento.longitud,
  };

  const redMarkerIcon = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
    fillColor: "red",
    fillOpacity: 1,
    scale: 2,
    strokeColor: "white",
    strokeWeight: 1,
  };

  // const [map, setMap] = React.useState<any>(null)

  // const onLoad = React.useCallback(function callback(map: any) {
  //   const bounds = new window.google.maps.LatLngBounds(position);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [position])

  // const onUnmount = React.useCallback(function callback(map: any) {
  //   setMap(null)
  // }, [])

  return (
    <Flex direction={"row"} gap={4}>
      <Flex mt={6}>
      {/* <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position}
          zoom={18}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          <Marker position={position} icon={redMarkerIcon}/>
        </GoogleMap>
      </LoadScript> */}
      </Flex>
      <Flex direction={"column"} gap={5} alignItems={"center"} flex={1} mt={6}>
        <Flex direction={"column"} gap={1} textAlign={"center"}>
        <Heading>{evento.titulo}</Heading>
        <Text as={"i"}>{evento.tematica}</Text>
        </Flex>
        <Flex>
          <ButtonGroup mt={0} display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} w={'100%'}>
              <IconButton
                aria-label="Compartir en Facebook"
                icon={<FaFacebook />}
                colorScheme="facebook"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
              />
              <IconButton
                aria-label="Compartir en Twitter"
                icon={<FaTwitter />}
                colorScheme="twitter"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}
              />
              <IconButton
                aria-label="Compartir en Instagram"
                icon={<FaInstagram />}
                colorScheme="instagram"
                onClick={() => window.open(`https://www.instagram.com/?url=${window.location.href}`, '_blank')}
              />
              <IconButton
                aria-label="Compartir en Whatsapp"
                icon={<FaWhatsapp />}
                colorScheme="whatsapp"
                onClick={() => window.open(`https://api.whatsapp.com/send?text=${window.location.href}`, '_blank')}
              />
          </ButtonGroup>
        </Flex>
        <Flex>
        <Text>{evento.descripcion}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}