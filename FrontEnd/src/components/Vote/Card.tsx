import './Card.css'

const Card = () => {
    return (
        <div className="card">
            <div className="card_form">
                <span>(Topic)</span>
                <img src="https://eschaco.com/galeria/20_07_24_letonia/foto8.jpg" alt="Obra" />
            </div>
            <div className="card_data">
                
                <div style={{ display: 'flex' }} className="data">
                <div className="text">
                    <label className="text_m">Main Title</label>
                    <div className="cube text_s">
                        
                        <label className="side top">Username-id</label>
                    </div>
                </div>
            </div>
            <span title="Acceder a la lista (Temas)">Access</span>
            </div>
        </div>
    )
}

export default Card;
