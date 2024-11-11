import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Heading, Divider, Card, SimpleGrid } from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import { useNavigate } from 'react-router-dom';
import { useEdicion } from '../../../EdicionContexto';

import './Mansory.css';
import Masonry from 'react-masonry-css';

import { getObras } from '../../../API/Admin/Obras';
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
  
  interface ObrasRelacionadasProps {
    esculturaId: number;
  }
  
const ObrasRelacionadas: React.FC<ObrasRelacionadasProps> = ({ esculturaId }) => {

    const [obras, setObras] = useState<Obra[]>([]);
    const navigate = useNavigate(); // para poder navegar entre paginas
    const {edicion} = useEdicion();

    useEffect(() => {
    const fetchObras = async () => {
        try {
          const response = await getObras(1, 10, edicion);
          setObras(response);
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
      };
      fetchObras();
    }, []);

    const handleCardClick = (id: number) => {
        navigate(`/public/obras/${id}`);
    };
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
    };

    const filteredObras = obras.filter(obra => obra.esculturaId !== esculturaId).slice(0, 3);
    return (
        <Flex>
        {obras && (
            <Flex pl={10} pr={10}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
        {filteredObras.map((obra, index) => {
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
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              },
              }}
              borderWidth={1}
              borderColor={'secundaryHover'}
              bgColor={'#F2F2F3'}
              w={'100%'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  // mb={2}
                >
                  <Box
                    // width="100%"
                    flex={1}
                
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
                            height: '100%',
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
                        bg="#0B192C"
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
                  p={3}
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
                  <Box onClick={() => handleCardClick(obra.esculturaId)}>
                  <Text noOfLines={3}>{obra.descripcion}</Text>
                  </Box>
                </Box>
              
            </Card>
          </React.Fragment>
        )}
        )}
        </Masonry>
        </Flex>
        )}
    </Flex>
    )
};

export default ObrasRelacionadas;