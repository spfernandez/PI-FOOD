import { createStore , applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer'

//esta linea es para conectar la extension con el navegador para poder usarla
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


//esta linea lo que me permite es hacer peticiones a servidores
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunkMiddleware)));


export default store;