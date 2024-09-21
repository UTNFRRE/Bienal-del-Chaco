import React from "react";
import Eventos from '../../../API/Admin/Eventos'; // Ajusta la ruta a donde se encuentra tu archivo de datos de eventos
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
  height: "400px",
  width: "100%",
};

const googleMapsApiKey = "AIzaSyB6cFwxUytgrCP9pqTTEIiLMm477qpJjPs"; // Reemplaza con tu clave de API de Google Maps

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

  return (
    <Flex direction={"column"} gap={10}>
      <h1>{evento.titulo}</h1>
      <p>{evento.fecha}</p>
      <p>{evento.descripcion}</p>
      <p>{evento.lugar}</p>
      <p>{evento.tematica}</p>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position}
          zoom={13}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
    </Flex>
  );
}