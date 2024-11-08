import {
  Box,
  CardBody,
  Card,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Mansory.css';
import Masonry from 'react-masonry-css';

import { getObras } from '../../../API/Admin/Obras';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

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

export default function ObrasPublic() {
  const [obras, setObras] = useState<Obra[]>([]);
  const navigate = useNavigate(); // para poder navegar entre paginas

  // La idea es agregar un paginado, ya que la cantidad de obras puede ser muy grande, agrego un paginado de 9 en 9
  // Los request se van a ir haciendo de a 9, y se va a ir mostrando de a 9, tdv no funciona pq no esta la api
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Cantidad de obras por página
  const [totalPages, setTotalPages] = useState(2);

  // Aca va el request a la api, cada vez que cambian el limite y el offset vuelvo a hacer el request para esos valores
  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await getObras(currentPage, pageSize);
        setObras(response);
        setTotalCount(response.length);
      } catch (error) {
        console.error('Error en el fetch de obras:', error);
      }
    };
    fetchObras();
  }, [currentPage, pageSize]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/public/obras/${id}`);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Box
      p={4}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      {obras && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {/* Como las imagenes estan en un arreglo, para usar el carrusel react pide que esten en un json con las llaves original y thumbnail. Entonces por cada obra se crea ese json */}
          {obras.map((obra) => {
            const images = [
              {
                original: obra.imagenes,
                thumbnail: obra.imagenes,
              },
            ];
            return (
              <React.Fragment key={obra.esculturaId}>
                {/* Como hay elementos que se renderizan dentro de otro elemento (carrusel dentro de la card) se usa esa tag para evitar errores */}
                <Card
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                  borderWidth={2}
                  borderColor={'secundaryHover'}
                  bgColor={'#FFFFFF'}
                >
                  <CardBody
                    borderRadius={10}
                    w="100%"
                    display="flex"
                    flexDirection={'column'}
                    h="auto"
                  >
                    <Box
                      position="relative"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      w="100%"
                      mb={2}
                    >
                      <Box
                        width="100%"
                        borderWidth={1}
                        borderColor={'secundaryHover'}
                      >
                        <ImageGallery
                          items={images}
                          showThumbnails={false} //desactivo las miniaturas
                          showPlayButton={false} // desactivo el boton de play
                          showFullscreenButton={false} // desactivo el boton de pantalla completa
                          autoPlay={true} //activo para que arranquen solas
                          slideInterval={4000 + obra.esculturaId * 100} //cada cuanto cambia, 4seg
                          renderItem={(item) => (
                            <img
                              src={item.original}
                              alt={obra.nombre}
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                objectPosition: 'center',
                              }}
                            />
                          )}
                        />
                        {obra.tematica && (
                          <Box
                            position="absolute"
                            bottom={0}
                            left={0}
                            bg="principal"
                            color="white"
                            p={1}
                          >
                            <Text as="i">{obra.tematica}</Text>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box
                      w="100%"
                      textAlign="left"
                      display="flex"
                      flexDirection={'column'}
                      gap={0}
                      onClick={() => handleCardClick(obra.esculturaId)}
                    >
                      <Heading fontFamily={'Times New Roman'}>
                        {obra.nombre}
                      </Heading>
                      <Text as={'kbd'}>{obra.escultorNombre}</Text>
                      <Divider
                        mt={1}
                        mb={1}
                        colorScheme={'black'}
                        size={'2x1'}
                      />
                    </Box>
                    <Box onClick={() => handleCardClick(obra.esculturaId)}>
                      <Text noOfLines={3}>{obra.descripcion}</Text>
                    </Box>
                  </CardBody>
                </Card>
              </React.Fragment>
            );
          })}
        </Masonry>
      )}
      <Box w={'100%'}>
        <Flex justifyContent="flex-end" mt={4} gap={1}>
          <IconButton
            aria-label="Previous Page"
            icon={<ArrowLeftIcon />}
            variant="bienal"
            borderRadius={3}
            onClick={() => handlePreviousPage()}
            isDisabled={currentPage === 1}
          />
          <IconButton
            aria-label="Next Page"
            icon={<ArrowRightIcon />}
            variant="bienal"
            borderRadius={3}
            onClick={() => handleNextPage()}
            isDisabled={currentPage === totalPages}
          />
        </Flex>
      </Box>
    </Box>
  );
}
