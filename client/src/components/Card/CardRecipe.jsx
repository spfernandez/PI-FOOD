import {Link} from 'react-router-dom';
import style from '../Card/CardRecipe.module.css';

const CardRecipe = ({id, image, name, diets}) =>{
    return(
        <div className={style.card_container}>
            <div className={style.card}>
                <Link to={`/detail/${id}`}>
                <img src={image} alt='img not found' className={style.card_img} />
                </Link>
                <h1 className={style.card_h1} >{name}</h1>
                <p className={style.card_p1} >Types of Diets:</p>
                <p className={style.card_p2} >
                <ul className={style.dietList}>
                                {diets && diets.map((diet, index) => (
                                <li key={index}>{diet}</li>
                            ))}
                                </ul>
                </p>
            </div>
        </div>
    )
}


export default CardRecipe;