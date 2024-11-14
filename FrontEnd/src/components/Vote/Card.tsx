import './Card.css';

interface Obra {
    esculturaId: number;
    nombre: string;
    tematica: string;
    descripcion: string;
    escultorId: number;
    fechaCreacion: string;
    esculturNombre: string;
    escultorPais: string;
    imagenes: string[];
    promedioVotos: number;
}

interface ObraProp {
    data: Obra;
}

const Card: React.FC<ObraProp> = ({ data }) => {
    return (
        <div className="card">
            <div className="card_form">
                <span>{data.esculturNombre}</span>
                <img src={data.imagenes[0]} alt="Obra" /> {/* Sin comillas alrededor de `data.imagenes[0]` */}
            </div>
            <div className="card_data">
                <div style={{ display: 'flex' }} className="data">
                    <div className="text">
                        <label className="text_m">{data.nombre}</label> {/* Sin comillas alrededor de `data.nombre` */}
                    </div>
                </div>
                <span title="Acceder a la lista (Temas)">Más información</span>
            </div>
        </div>
    );
};

export default Card;
