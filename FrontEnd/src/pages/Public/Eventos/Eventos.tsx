import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { Flex } from '@chakra-ui/react';
import EventosDia from './EventosDia';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventosPublic() {

    const [date, setDate] = useState<Date | null>(null);

    const handleClick = ( value: Date) => {
        setDate(value);
    }

    const [value, onChange] = useState<Value>(new Date());

    return (
        <Flex justifyContent={"center"} alignItems={"center"} direction={"row"}>
            <Flex>
            <Calendar onChange={onChange} value={value} onClickDay={(value) => handleClick(value)}/>
            </Flex>
            {date !== null ? <Flex>
                <EventosDia dia={date}/>
            </Flex> : null};
        </Flex>
    )
}