import style from '../Pagination/Pagination.module.css';

const PaginationCards = ({cardsPage, recipes, pagination, page}) => {

    const pageNumbers = [];

    for(let i = 0; i <= Math.ceil(recipes/cardsPage) - 1; i++ ){
        pageNumbers.push(i + 1)
    }

    return(
        <div>
            <ul className={style.pagination}>
                <button onClick={() => pagination(page > 1 ? page - 1 : 1)} className={style.btns1}>Prev</button>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <button key={number} onClick={() => pagination(number)} className={style.btns}>
                            {number}
                        </button>
                    ))}
                <button onClick={() => pagination(page < pageNumbers.length ? page + 1 : pageNumbers.length)} className={style.btns1}>Next</button>
            </ul>
        </div>
    )
}

export default PaginationCards;