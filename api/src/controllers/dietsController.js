const { Diets } = require('../db');
const { getAllRecipes } = require('./recipeController');

const getAllDiets = async () => {
    const dataApi = await getAllRecipes();

    const dietsApi = [...new Set(dataApi.flatMap(el => el.diets.map(d => d)))]
    
    console.log(dietsApi)
   

    dietsApi.forEach(diet => {
        Diets.findOrCreate({
            where: {name: diet}
        })
    });

    const dbDiets = await Diets.findAll();
    return dbDiets;
}
    





module.exports = {
    getAllDiets
};