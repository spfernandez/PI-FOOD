import SearchBar from "../Search/SearchBar"
import {Link} from "react-router-dom";
import style from "../Nav/NavBar.module.css"

const NavBar = ({setPage}) => {

    const handleRefreshClick = () => {
        window.location.reload();
      };

    return(
        <nav className={style.navbar}>
            <button onClick={handleRefreshClick} className={style.btn_2}>Reset</button>
            <SearchBar setPage={setPage}/>
            <Link to='/create'>
                <button className={style.btn_3}>Create Your Recipe!</button>
            </Link>
        </nav>
    )
}

export default NavBar;

