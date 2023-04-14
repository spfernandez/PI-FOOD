import { useDispatch } from "react-redux"
import style from '../Order/Order.module.css';

const OrderByName = ({setPage, setOrder, orderByName}) => {

    const dispatch = useDispatch();
   
    const handleOrderByName = (event) => {
        dispatch(orderByName(event.target.value))       
        setPage(1)
        setOrder(`${event.target.value}`)
    }


    return(
        <div>
            <select onChange={handleOrderByName} className={style.order}>
                <option value='' disabled selected className={style.opt}> Alphabetic Order</option>
                <option value="Asc" className={style.opt}>A - Z</option>
                <option value="Des" className={style.opt}>Z - A</option>
            </select>
        </div>
    )
}

export default OrderByName;