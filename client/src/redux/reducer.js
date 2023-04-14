import {GET_RECIPES, GET_DIETS, RECIPE_DETAIL, CLEAN_DETAIL, SEARCH_NAME, FILTER_BY_DIETS, FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE, CREATE_RECIPE} from './action-type'

const initialState = {
    recipes: [],
    allRecipes: [],
    recipesDetail: {},
    diets: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        case GET_DIETS: 
            return{
                ...state,
                diets: action.payload
            }
        case SEARCH_NAME:
            return {
                ...state,
                recipes: action.payload
            };
        case RECIPE_DETAIL:
            return {
                ...state,
                recipesDetail: action.payload
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                recipesDetail: {}
            };
        case FILTER_BY_DIETS:
            const filterDiet = state.allRecipes;
            const filtered = action.payload === 'All' ? filterDiet : filterDiet.filter(el => el.diets.includes(action.payload))
            return{
                ...state,
                recipes: filtered
            };
        case FILTER_BY_CREATED:
            const filterCreated = state.allRecipes;
            const createdFiltered = action.payload === 'Created' ? filterCreated.filter(el => el.createdInDb) :
                                    filterCreated.filter(el => !el.createdInDb)
            return{
                ...state,
                recipes: createdFiltered
            };
        case ORDER_BY_NAME:
            const orderName = action.payload === 'Asc' ?            
            state.allRecipes.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0
            }) :
            state.allRecipes.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0
            });
            return{
                ...state,
                recipes: orderName
            }
        case ORDER_BY_SCORE:
            const {allRecipes} = state;
            allRecipes.sort((a, b) =>{
                if(action.payload === 'Min'){
                    if(a.healthScore < b.healthScore){
                        return -1
                    } return 1
                } 
                else if(action.payload === 'Max'){
                    if(a.healthScore > b.healthScore){
                        return -1
                    } return 1
                }
                else return 0
            })
            return{
                ...state,
                recipes: allRecipes
            };
        case CREATE_RECIPE:
            return{
                ...state
            }    
        default:
            return {
                ...state
            }
    }
}


export default reducer;