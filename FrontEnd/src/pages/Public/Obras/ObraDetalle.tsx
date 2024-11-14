import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, Button } from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import RedesSocialesLight from '../../../components/Redes/RedesSocialesLight';
import { useEffect, useState } from 'react';
import { getObraById } from '../../../API/Admin/Obras';
import Cookies from 'js-cookie';
import ObrasRelacionadas from './ObrasRelacionadas';
import { HeadVotos } from '../../../API/Public/Votacion';

interface Obra {
  esculturaId: number;
  nombre: string;
  tematica: string | null;
  descripcion: string;
  fechaCreacion: string;
  escultorNombre: string;
  escultorPais: string;
  escultorImagen: string;
  imagenes: string;
}

const ObraDetail = () => {
  const userId = Cookies.get('IdUser');
  const { id } = useParams<{ id: string }>();
  const [obra, setObra] = useState<Obra | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObraById = async () => {
      if (!id) return;
      try {
        const data = await getObraById(id);
        setObra(data);
      } catch (error) {
        console.error('Error en el fetch de la obra:', error);
      }
    };
    fetchObraById();
  }, [id]);

  useEffect(() => {
    const fetchHeadVotos = async () => {
      if (!userId || !obra) return;
      try {
        const response = await HeadVotos(userId, obra.esculturaId);
        if (response.ok) {
          setIsDisabled(true); // Deshabilita el botón si la API responde con 200
        }
      } catch (error) {
        console.error('Error en la verificación de votos:', error);
      }
    };
    if (obra) {
      fetchHeadVotos();
    }
  }, [obra, userId]);

  const handleVotarClick = () => {
    navigate(`/public/voting/${id}/${userId}`);
  };

  return (
    <Box display="flex" flexDirection="column" w="100%">
      {obra && (
        <Flex direction="column" w="100%">
          <Box w="100%" minHeight="33vh" backgroundColor="#0B192C">
            <Heading color="#CDC2A5" fontSize="5xl">{obra.nombre}</Heading>
            <RedesSocialesLight />
          </Box>
          <Flex justifyContent="space-between">
            <ImageGallery
              items={[{ original: obra.imagenes, thumbnail: obra.imagenes }]}
              showPlayButton
              autoPlay
              slideInterval={5000}
            />
            <Box>
              <Image src={obra.escultorImagen} boxSize="90px" borderRadius="full" />
              <Heading size="sm">{obra.escultorNombre}</Heading>
              <Text as="i">{obra.escultorPais}</Text>
              <Text>Bajo la temática {obra.tematica}</Text>
              <Text>Creada el {obra.fechaCreacion}</Text>
              <Text>{obra.descripcion}</Text>
              <Button onClick={handleVotarClick} isDisabled={isDisabled}>Votar</Button>
            </Box>
          </Flex>
          <ObrasRelacionadas esculturaId={obra.esculturaId} />
        </Flex>
      )}
    </Box>
  );
};

export default ObraDetail;
