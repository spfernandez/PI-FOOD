const {Router} = require('express');
const { getRecipeByNameHandler, getRecipeByIdHandler, postRecipeHandler, putRecipeHandler, deleteRecipeHandler } = require('../handlers/recipeHandler');

const recipeRoutes = Router();

recipeRoutes.get('/', getRecipeByNameHandler);

recipeRoutes.get('/:idRecipe', getRecipeByIdHandler);

recipeRoutes.post('/', postRecipeHandler);

recipeRoutes.put('/:idRecipe', putRecipeHandler);

recipeRoutes.delete('/:idRecipe', deleteRecipeHandler);


module.exports = recipeRoutes;