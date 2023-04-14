//aca traigo las funciones de los controllers y nada mas
const {getAllRecipes, searchRecipeByName, getRecipeById, createRecipe, updateRecipes, deleteById} = require('../controllers/recipeController');


//handler busqueda por nombre
const getRecipeByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const recipeName = name? await searchRecipeByName(name) : await getAllRecipes();
        res.status(200).send(recipeName)
    } catch(error){
        res.status(400).json({error: error.message})
    }
};

//handler busqueda por id
const getRecipeByIdHandler = async (req, res) => {
    const { idRecipe } = req.params;
    try{
        const recipeById = await getRecipeById(idRecipe);
        res.status(200).send(recipeById)
    } catch(error){
        res.status(400).json({error: error.message})
    }
};


//handler para crear una receta
const postRecipeHandler = async (req, res) => {
    try {
        const newRecipe = await createRecipe(req.body);
        res.status(200).send(newRecipe);
    } catch(error){
        res.status(400).json({error: error.message})
    }

};

const putRecipeHandler = async (req, res) => {
    const {idRecipe} = req.params
    const {name, summary, healthScore, steps, image, diets} = req.body 
    try{
        const update = await updateRecipes(idRecipe, name, summary, healthScore, steps, image, diets); 
        res.status(200).send(update)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


const deleteRecipeHandler = async (req, res) => {
    const {idRecipe} = req.params;
    try{
        const deleteRecipe = await deleteById(idRecipe);
        res.send(deleteRecipe)
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getRecipeByNameHandler,
    getRecipeByIdHandler,
    postRecipeHandler,
    putRecipeHandler,
    deleteRecipeHandler
}