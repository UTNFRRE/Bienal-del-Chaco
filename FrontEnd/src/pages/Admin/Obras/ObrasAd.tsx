import AgregarObra from "../../../components/ModalAmin/AgregarObra"
import ModificarObra from "../../../components/ModalAmin/ModificarObra"
import EliminarObra from "../../../components/ModalAmin/EliminarObra"

export default function ObrasAdmin() {

    return(
        <>
            <h1> OBRAS ADMIN</h1>
            <AgregarObra />
            <ModificarObra />
            <EliminarObra />
        </>
    )

}