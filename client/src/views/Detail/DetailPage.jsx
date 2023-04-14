import { useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { recipeDetail, cleanDetail } from "../../redux/actions";
import style from '../Detail/DetailPage.module.css';



const DetailPage = () => {

    const recipesDetail = useSelector((state) => state.recipesDetail)
    const dispatch = useDispatch();
    

    const { id } = useParams()


    useEffect(() => {
        dispatch(recipeDetail(id))
        return () => {
          dispatch(cleanDetail());
        }; 
      }, [dispatch, id]);
    
    return (

        
            
            <div className={style.detail_container}>
                <div>
                    <Link to='/home'>
                        <button onClick={() => dispatch(cleanDetail())} className={style.close_button}>X</button>
                    </Link>
                </div>

                
                    
                        <h1 className={style.title}>{recipesDetail.name}</h1>
                        
                    <div className={style.content}>
                        <div className={style.recipe_container}>
                            <img className={style.recipe_image} src={recipesDetail.image} alt='img not found'/>
                            <div div className={style.diets_container}>
                            <h3>Type of Diets:</h3>
                                <ul className={style.dietList}>
                                {recipesDetail.diets && recipesDetail.diets.map((diet, index) => (
                                <li key={index}>{diet}</li>
                            ))}
                                </ul>
                            </div>
                            <div>
                                <p className={style.health_score}><h3>Health Score: </h3>{recipesDetail.healthScore}</p>
                            </div>
                            <div >
                                <p className={style.summary}><h3>Summary:</h3> {recipesDetail.summary}</p>
                            </div>
                            <div className={style.steps}>
                                <h3>Steps:</h3>
                                <ol className={style.stepList}>
                                {recipesDetail.steps && recipesDetail.steps.map((step, index) => (
                                <li key={index}>{`${index + 1}- ${step}`}</li>
                            ))}
                                </ol>
                            </div>

                        </div>
                        </div>
                       
            </div>
       
    )
}

export default DetailPage;