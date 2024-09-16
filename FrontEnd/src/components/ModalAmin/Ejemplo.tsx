
import { Button, useDisclosure} from '@chakra-ui/react';
import AgregarObra from './AgregarObra';
import ModificarObra from './ModificarObra';
import ModalConfirmar from '../Modal/ConfirmarCambios';


function Holamundo(){

    const {
        isOpen: isOpenAdd,
        onOpen: onOpenAdd,
        onClose: onCloseAdd,
    } = useDisclosure();
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit,
    } = useDisclosure();
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    async function handleConfirmarAdd(titulo:string, tematica:string, fecha:Date, autor:string, paisAutor:string, descripcion:string, imagenes:File[] ): Promise<void> {
        console.log(titulo, tematica, fecha, autor, paisAutor, descripcion, imagenes);
        //Aca se hace el post a la API para agregar la obra
        onCloseAdd();
    }

    const evento = {
        id: 1,
        titulo: "La noche estrellada",
        tematica: "Impresionismo",
        fecha: new Date("1889-06-01"),
        autor: "Vincent van Gogh",
        paisAutor: "Países Bajos",
        descripcion: "La noche estrellada es una pintura del artista neerlandés Vincent van Gogh. La obra muestra la vista desde la ventana de la habitación del sanatorio de Saint-Rémy-de-Provence, donde se encontraba internado.",
        imagenes: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"],
    }

    const handleEditar = (evento:any) => {
        console.log(evento);
        onOpenEdit();
    }

    const handleDelete = (evento:any) => {
        console.log(evento);
        onOpenDelete();
    }
    
    const handleConfirmarEdit = () => {
        //Llamar a la API para editar la obra
        console.log("Editado");
        onCloseEdit();
    }

    const handleConfirmarDelete = () => {
        //Llamar a la API para eliminar la obra
        console.log("Eliminado");
        onCloseDelete();
    }

    
    return(

        <>
            <Button onClick={onOpenAdd}> Agregrar</Button>
            <Button onClick={() => handleEditar(evento)}>Editar</Button>
            <Button onClick={() => handleDelete}>Eliminar</Button>

            <AgregarObra 
                isOpen={isOpenAdd}
                onClose={onCloseAdd}
                confirmar= {handleConfirmarAdd}
            />
            <ModificarObra 
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
                confirmar = {handleConfirmarEdit}
                evento={evento}
            />
            <ModalConfirmar 
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
                texto="¿Está seguro que desea eliminar la obra?"
                confirmar={handleConfirmarDelete}
            />
        </>
    );
}

export default Holamundo;