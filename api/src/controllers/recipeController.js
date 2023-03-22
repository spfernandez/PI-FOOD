const { Recipe, Diets } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const API_KEY1 = process.env.API_KEY1 || API_KEY;


//En esta funcion hago el llamado a la api para que me devuelva el resultado de determinadas propiedades con los valores que necesito
const getAllRecipes = async () => {
    const apiFood = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`);
    
    const apiRecipes = apiFood.data.results.map(d => {
        
        const step = [...new Set(d.analyzedInstructions.flatMap(el => el.steps.map(s => s.step)))];
        const ingredients = [...new Set(d.analyzedInstructions.flatMap(s => s.steps.flatMap(i => i.ingredients.map(n => n.name))))];
        const cookWare = [...new Set(d.analyzedInstructions.flatMap(s => s.steps.flatMap(e => e.equipment.map(n => n.name))))];
        if(!cookWare.length) cookWare.push('Unspecified data');

        const diets = d.diets;
        if(d.vegetarian && !diets.includes("vegetarian")) diets.push("vegetarian");
        if(d.vengan && !diets.includes("vegan")) diets.push("vegan");
        if(d.glutenFree && !diets.includes("gluten free")) diets.push('gluten free');
        if(!diets.length) diets.push('Unspecified data');
    

        return {
            id: d.id,
            name: d.title,
            summary: d.summary,
            healthScore: d.healthScore,
            steps: { 
                ingredients, 
                cookWare,
                step 
            },           
            time: d.readyInMinutes + " minutes",
            image: d.image,
            diets,
            vegetarian: d.vegetarian,
            vegan: d.vegan,
            glutenFree: d.glutenFree,
            created: false
        } 

    });
    
    

    // hago el llamado a la db para que me devuelva todos los registros incluyendo el model diets.name
    const dbRecipes = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    
    //aca pido que me retorne tanto la api como la db en una sola matriz
    return [...apiRecipes, ...dbRecipes]
     
};


//controlador para que busque el nombre y envíe la respueta al handler
const searchRecipeByName = async (name) => {
    
    const infoRecipes = await getAllRecipes();

    const recipesName = infoRecipes.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));

    if(!recipesName.length){
        throw new Error(`There is no recipe with that name`)
    } 
        return recipesName
};

//controlador para que busque por id y envíe la respuesta al handler, ya sea el valor o el error
const getRecipeById = async (id) => {

    const infoRecipes = await getAllRecipes();

    const recipesId = infoRecipes.find(d => d.id.toString() === id);

    if(!recipesId){
        throw new Error(`The id ${id} not found`);
    } 

    return recipesId
}

//controlador para crear una receta
const createRecipe = async ({name, summary, healthScore, steps, time, image, diets, createdInDb}) => {

    if(!name || !summary || !healthScore || !steps || !time || !image || !diets ){
        throw new Error('Missing data')
    }

    let newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps, 
        time,
        image,
        createdInDb
    });


    let dietDb = await Diets.findAll({ 
        where: {name: diets},
    })
    await newRecipe.addDiets(dietDb);
    return {message: 'Recipe Created!', newRecipe};

}

const updateRecipes = async (id, name, summary, healthScore, steps, time, image, diets) => {

    if(!id) throw new Error(`The ${id} does not exist`);

    let updateRecipe = await Recipe.update({
        name: name,
        summary: summary,
        healthScore: healthScore,
        steps: steps,
        time: time,
        image: image,
        diets: diets
    }, {
        where: {id: id}
    })
    return updateRecipe;
} 

const deleteById = async (id) => {

    const recipeById= await Recipe.findByPk(id);

    if(!recipeById) throw new Error(`The ${id} does not exist`)
    await recipeById.destroy();
    return {message: 'Recipe deleted successfully'};
}



module.exports = {
    getAllRecipes,
    searchRecipeByName,
    getRecipeById,
    createRecipe,
    updateRecipes,
    deleteById
}