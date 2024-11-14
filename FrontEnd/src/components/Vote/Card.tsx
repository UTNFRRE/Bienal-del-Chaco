import './Card.css'

const Card= () => {
    return (
        <div className="card">
            <div className="card_form">
                <span>cam</span>
                <img src="{data.imagenes[0]}" alt="Obra" />
            </div>
            <div className="card_data">
                
                <div style={{ display: 'flex' }} className="data">
                <div className="text">
                    <label className="text_m">Obra</label>
                </div>
            </div>
            <span title="Acceder a la lista (Temas)">Mas information</span>
            </div>
        </div>
    )
}

export default Card;
