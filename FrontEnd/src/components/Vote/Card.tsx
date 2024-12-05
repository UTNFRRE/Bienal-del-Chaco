import './Card.css';


type Imagen = {
    url: string;
    id: number;
    esculturaId: number;
  };
  interface Obra {
    esculturaId: number;
    nombre: string;
    tematica: string | null;
    descripcion: string;
    fechaCreacion: string;
    escultorNombre: string;
    escultorPais: string;
    escultorImagen: string;
    imagenes: Imagen[];
    promedioVotos: number;
  }
  
import {Image} from '@chakra-ui/react'
interface ObraProp {
    data: Obra;
}

const Card: React.FC<ObraProp> = ({ data }) => {
    return (
        <div className="card">
            <div className="card_form">
                <span>{data.escultorNombre}</span>
                <Image
                src={data.imagenes[0].url}
                boxSize="90px"
                borderRadius="full"
                borderWidth={1}
                borderColor="azul"
                borderStyle="solid"
              />
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
