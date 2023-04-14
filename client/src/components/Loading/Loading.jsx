import style from '../Loading/Loading.module.css';

const Loading = () => {
    return(
        <div className={style.loading_container}>
            <div className={style.loading}></div>
        </div>
    )
}

export default Loading;