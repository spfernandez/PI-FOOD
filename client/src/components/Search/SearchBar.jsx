import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { recipeByName } from '../../redux/actions.js' 
import { useHistory } from 'react-router-dom'
import style from '../Search/SearchBar.module.css'

const SearchBar = ({setPage}) => {

    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleOnChange = (event) => {
        setName(event.target.value)
        console.log(name)
    } 

    const handleOnSubmit = () => {
        if(name === ""){
            alert('required name');
            history.push('/home')
        } 
        else{
            dispatch(recipeByName(name))
            setPage(1)
            setName("")
        }
    }

    return(
        <div className={style.search}>
            <input 
                type='text'
                placeholder='Search Recipe...'
                value={name}
                onChange={handleOnChange}
                className={style.search_input}
            />

            <button type='submit' onClick={handleOnSubmit} className={style.search_button}>Search</button>
        </div>
    )
}

export default SearchBar;