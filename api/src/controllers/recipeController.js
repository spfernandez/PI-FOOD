const { Recipe, Diets } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const API_KEY1 = process.env.API_KEY1 || API_KEY;


//En esta funcion hago el llamado a la api para que me devuelva el resultado de determinadas propiedades con los valores que necesito
const getAllRecipes = async () => {
    const apiFood = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    
    const apiRecipes = apiFood.data.results.map(d => {
        
        const step = d.analyzedInstructions && d.analyzedInstructions.length > 0 ? [...new Set(d.analyzedInstructions.flatMap(el => el.steps.map(s => s.step)))] : [];
        if(!step.length) step.push('Unspecified data')

        const diets = d.diets.map(diet => diet);
        if(d.vegetarian && !diets.includes("vegetarian")) diets.push("vegetarian")
        if(d.vengan && !diets.includes("vegan")) diets.push("vegan");
        if(!diets.length) diets.push('unspecified data');
    

        return {
            id: d.id,
            name: d.title,
            summary: d.summary.replace(/<.*?>/g, ''),
            healthScore: d.healthScore,
            steps: step,
            image: d.image,
            price: d.price,
            diets,
            createdInDb: false
        } 
        
    });
    

    // hago el llamado a la db para que me devuelva todos los registros incluyendo el model diets.name
    const dbInfo = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
        
    });

    const dbRecipes = dbInfo.map(data => {
        
        return {
            id: data.id,
            name: data.name,
            summary: data.summary,
            healthScore: data.healthScore,
            steps: data.steps,
            image: data.image,
            price: data.price,
            diets: data.diets.map(d => d.name),
            createdInDb: data.createdInDb
        }
    })
    
    
    
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
const createRecipe = async ({name, summary, healthScore, steps, image, diets, price, createdInDb}) => { 

    if(!name || !summary || !healthScore || !steps || !image || !diets ){ 
        throw new Error('Missing data')
    }

    let newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        image,
        price,
        createdInDb
    });


    let dietDb = await Diets.findAll({ 
        where: {name: diets},
    })
    await newRecipe.addDiets(dietDb);
    return {message: 'Recipe Created!', newRecipe};

}


//controlador para actualizar datos con busqueda por id
const updateRecipes = async (id, name, summary, healthScore, steps, image, diets) => { 

    if(!id) throw new Error(`The ${id} does not exist`);

    let updateRecipe = await Recipe.update({
        name: name,
        summary: summary,
        healthScore: healthScore,
        steps: steps,
        image: image,
        diets: diets 
    }, {
        where: {id: id}
    })
    return updateRecipe;
} 

// controlador para eliminar id
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