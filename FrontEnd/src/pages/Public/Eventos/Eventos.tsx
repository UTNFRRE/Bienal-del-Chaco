import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { Flex } from '@chakra-ui/react';
import EventosDia from './EventosDia';
import { ProximosEventos } from './ProximosEventos';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventosPublic() {
  const [date, setDate] = useState<Date | null>(null);

  const handleClick = (value: Date) => {
    setDate(value);
  };

  useEffect(() => {
    setDate(new Date());
  }, []);

  const [value, onChange] = useState<Value>(new Date());

  return (
    <Flex direction={'column'} gap={10}>
      <Flex direction={'column'}>
        <ProximosEventos />
      </Flex>
      <Flex justifyContent={'space-around'} direction={{base:"column", md:"row"}}>
        <Flex width={{base:"90%"}} ml={{base:5}}>
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={(value) => handleClick(value)}
          />
        </Flex>
        <Flex>
          <EventosDia dia={date} />
        </Flex>
      </Flex>
    </Flex>
  );
}
