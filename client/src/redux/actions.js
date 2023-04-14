import {GET_RECIPES, GET_DIETS, RECIPE_DETAIL, CLEAN_DETAIL, SEARCH_NAME, FILTER_BY_DIETS, FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_SCORE } from './action-type';
import axios from 'axios';

//trae todas las recetas de la api y la db
export const getRecipes = () => {
    return function(dispatch){
            fetch('http://localhost:3001/recipes')
            .then(res => res.json())
            .then(data => dispatch({
                type: GET_RECIPES, 
                payload: data 
            })
        )}
            
};

//se obtiene las recetas por nombre
export const recipeByName = (name) => {
    return function(dispatch){
            fetch(`http://localhost:3001/recipes?name=${name}`)
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    alert('Error: '+ data.error)
                } else {
                    dispatch({
                        type: SEARCH_NAME,
                        payload: data
                    })
                }
        })
            .catch(error => {
                console.log(error)
        })
    }       
    
}

//se obtiene la receta por id
export const recipeDetail = (id) => {
    return function(dispatch){
            fetch(`http://localhost:3001/recipes/${id}`)
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    alert('Error ' + data.error)
                } else {
                    dispatch({
                        type: RECIPE_DETAIL, 
                        payload: data 
                    })
                }     
        })
            .catch(error => {
                alert(error);
                console.log(error)
        })
    } 
};

//permite salir del detail, lo limpia
export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
};

//se obtiene todos los tipos de dietas
export const getDiets = () => {
    return function(dispatch){
            fetch('http://localhost:3001/diets')
            .then(res => res.json())
            .then(data => dispatch({
                type: GET_DIETS,
                payload: data
            })
        )}
            
};

//filtra por tipo de dieta
export const filterByDiets = (payload) => {
    return{
        type: FILTER_BY_DIETS,
        payload
    }
};

//filtra por existencia o creado
export const filterByCreated = (payload) => {
    return{
        type: FILTER_BY_CREATED,
        payload
    }
};

//ordena alfabeticamente por nombre de receta A-Z Z-A 
export const orderByName = (payload) => {
    return{
        type: ORDER_BY_NAME,
        payload
    }
};

//ordena de MENOR MAYOR MAYOR A MENOR los niveles saludables
export const orderByHScore = (payload) => {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
};

//crea recetas
export const postRecipes = (payload) => {
    
    return async function(){
        try{
            const data = await axios.post('http://localhost:3001/recipes', payload)
            alert('Recipe Created')
            return data
        } catch(error){
            alert('Error: ' + error.response.data.error);
            console.log(error.response.data.error)
        }  
    }
};