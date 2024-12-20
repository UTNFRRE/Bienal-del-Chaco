import './Button.css';
import { useState } from 'react';

interface BotonProps {
    onRatingChange: (rating: number) => void; // Cambié `Number` a `number`
}

const Boton: React.FC<BotonProps> = ({ onRatingChange }) => {
    const [rating, setRating] = useState<number>(0); // Cambié `number | null` a `number`

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = Number(event.target.value);
        setRating(newRating);
        onRatingChange(newRating); // Llama a onRatingChange con `number`
    }

    return (
        <> 
            <div className="rating">
                <input value="5" name="rate" id="star5" type="radio" onChange={handleChange} />
                <label title="text" htmlFor="star5"></label>
                <input value="4" name="rate" id="star4" type="radio" onChange={handleChange}/>
                <label title="text" htmlFor="star4"></label>
                <input value="3" name="rate" id="star3" type="radio" onChange={handleChange} />
                <label title="text" htmlFor="star3"></label>
                <input value="2" name="rate" id="star2" type="radio" onChange={handleChange}/>
                <label title="text" htmlFor="star2"></label>
                <input value="1" name="rate" id="star1" type="radio" onChange={handleChange}/>
                <label title="text" htmlFor="star1"></label>
            </div>
        </>  
    )
}

export default Boton;
