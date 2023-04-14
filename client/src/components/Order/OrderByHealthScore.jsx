import { useDispatch } from "react-redux";
import style from '../Order/Order.module.css';

const OrderByHealthScore = ({setPage, setOrder, orderByHScore}) =>{

    
    const dispatch = useDispatch()

    const handleOrderByHScore = (event) => {
        dispatch(orderByHScore(event.target.value))       
        setPage(1)
        setOrder(`${event.target.value}`)
    }

    return(
        <div>
            <select onChange={handleOrderByHScore} className={style.order}>
                <option value='' disabled selected className={style.opt}>Order By Health Score</option>
                <option value='Min' className={style.opt}>Min Health Score</option>
                <option value='Max' className={style.opt}>Max Health Score</option>

            </select>
        </div>

    )
}

export default OrderByHealthScore;