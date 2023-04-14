import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';
import Loading from '../../components/Loading/Loading';




const LandingPage = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
          }, 2000);
      
          return () => clearTimeout(timer);
        }, [])
    
    return(
        <section className={style.landing}>
            {loading ? (
                <Loading/>
            ) : (
             <>
                <div>
                    <p className={style.p_1}>Welcome to a healthy world, where you will find the best 100 recipes to delight your palate...!</p>
                </div>
                <div className={style.container}>
                    <h1 className={style.h_1}>Food App</h1>
                </div>
                
                <div>
                    <Link to='/home'>
                        <button className={style.btn_1}>
                            Go to recipes!
                        </button>
                    </Link>
                </div>
            </>   
            )}
        </section>
    )
}

export default LandingPage;
