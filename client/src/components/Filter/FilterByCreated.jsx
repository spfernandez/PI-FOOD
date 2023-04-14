import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { filterByCreated, getRecipes } from "../../redux/actions"
import style from '../Filter/Filter.module.css'

const FilterByCreated = ({setPage}) => {


    const [create, setCreate] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])

    const handleFilterCreated = (event) => {
        dispatch(filterByCreated(event.target.value));
        setPage(1);
        setCreate(`Filtrado ${event.target.value}`);
    }

    return(
        <div>
            <select onChange={handleFilterCreated} className={style.filter}>
                <option value='' disabled selected className={style.opt}>Filter By Create</option>
                <option value='Created' className={style.opt}>Created</option>
                <option value='Api' className={style.opt}>Exist</option>
            </select>
        </div>
    )
}

export default FilterByCreated;