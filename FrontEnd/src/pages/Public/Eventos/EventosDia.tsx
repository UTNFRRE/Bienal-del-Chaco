
interface EventosDiaProps {
    dia: Date;
};

const EventosDia: React.FC<EventosDiaProps> = ({ dia }) => {

    return (
        <div>
            <h1>Eventos del dia {dia.getUTCDate()}</h1>
        </div>
    )
}

export default EventosDia;