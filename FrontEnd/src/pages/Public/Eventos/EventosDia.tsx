import { Flex, Heading, Text } from '@chakra-ui/react';

interface EventosDiaProps {
  dia: Date | null;
}

const EventosDia: React.FC<EventosDiaProps> = ({ dia }) => {
  const formattedDate = dia?.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Flex>
      <Text fontSize={20}>Eventos del {formattedDate}</Text>
    </Flex>
  );
};

export default EventosDia;
