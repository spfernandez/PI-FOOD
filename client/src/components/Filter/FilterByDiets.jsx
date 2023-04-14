
import { useState, useEffect} from "react";
import {filterByDiets, getDiets} from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import style from '../Filter/Filter.module.css'


const FilterByDiets = ({setPage}) => {

    const diets = useSelector(state => state.diets)
    const dispatch = useDispatch();

    const [diet, setDiet] = useState('All')

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    const dietsOrder = diets.sort((a, b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0
    })

    const handleFilterDiets = (event) => {
        dispatch(filterByDiets(event.target.value))
        setPage(1)
        setDiet(`Filtrado ${event.target.value}`)
        
    }

    return(
        <div>
            <select onChange={handleFilterDiets} className={style.filter}>
                <option value='' disabled selected className={style.opt}>Filter By Types of Diets</option>
                <option value='All' className={style.opt}>All</option>
                {dietsOrder?.map((el, index) => {
                    return(
                        <option 
                        key={index} 
                        value={el.name}
                        className={style.opt}>
                            {el.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}


export default FilterByDiets;
