import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, orderByName, orderByHScore} from "../../redux/actions";
import PaginationCards from "../../components/Pagination/PaginationCards";
import CardRecipe from "../../components/Card/CardRecipe";
import NavBar from "../../components/Nav/NavBar";
import OrderByName from "../../components/Order/OrderByName";
import OrderByHealthScore from "../../components/Order/OrderByHealthScore";
import FilterByCreated from "../../components/Filter/FilterByCreated";
import FilterByDiets from "../../components/Filter/FilterByDiets";
import Loading from "../../components/Loading/Loading";
import style from '../Home/HomePage.module.css'



const HomePage = () => {

    const recipes = useSelector(state => state.recipes)   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    const [order, setOrder] = useState('')    
    const [page, setPage] = useState(1); //aranca en la primer pagina
    const [cardsPage, setCardsPage] = useState(9); //guarda cuantas cartas quiero por pagina
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(recipes.length > 0) {
          setLoading(false);
        }
      }, [recipes])

    const indexLastCard = page * cardsPage; //pagina actual q estoy * la cantidad de recetas x pagina '9'
    const indexFirstCard = indexLastCard - cardsPage; //indice del ultimo personaje - los recetas por pag

    const currentCards = recipes.slice(indexFirstCard, indexLastCard);  //va tener las recetas que tiene en la pagina actual

    const pagination = (pageNumber) => {
        setPage(pageNumber)
    }


    return(
        <div className={style.home}>
            <NavBar setPage={setPage}/>
            <div className={style.home_div2}>
                <ul className={style.list_ul}>
                <li className={style.li_1}><FilterByDiets setPage={setPage} /></li>
                <li className={style.li_2}><FilterByCreated setPage={setPage}/></li>
                <li className={style.li_3}><OrderByName setPage={setPage} setOrder={setOrder} orderByName={orderByName} /></li> 
                <li className={style.li_4}><OrderByHealthScore setPage={setPage} setOrder={setOrder} orderByHScore={orderByHScore} /></li>
            </ul> 
            </div>

            <PaginationCards 
                cardsPage={cardsPage}
                recipes={recipes.length}
                pagination={pagination}
                page={page}
            />


            { loading ?  <Loading /> :
                <div className={style.card_container}>
                {currentCards.map(card=> {
                    return <CardRecipe
                            key={card.id}
                            id={card.id}
                            image={card.image}
                            name={card.name}
                            diets={card.diets}
                        />
                    })}
                </div>
            }
            
            <PaginationCards 
                cardsPage={cardsPage}
                recipes={recipes.length}
                pagination={pagination}
                page={page}
            />
            
        </div>
    )
}

export default HomePage;