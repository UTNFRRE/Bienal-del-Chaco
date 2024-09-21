
interface EventosDiaProps {
    dia: Date | null;
};

const EventosDia: React.FC<EventosDiaProps> = ({ dia }) => {

    const formattedDate = dia?.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <h1>Eventos del dia {formattedDate}</h1>
        </div>
    )
}

export default EventosDia;