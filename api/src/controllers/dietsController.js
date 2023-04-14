const { Diets } = require('../db');
const { getAllRecipes } = require('./recipeController');

const getAllDiets = async () => {
    const dataApi = await getAllRecipes();

    const dietsApi = [...new Set(dataApi.flatMap(el => el.diets.map(d => d)))]
   

    const diet = dietsApi.map(d => {
        return Diets.findOrCreate({
            where: {name: d}
        })
    })
    await Promise.all(diet);

    const dbDiets = await Diets.findAll();
    return dbDiets;
    
}
    
module.exports = {
    getAllDiets
};