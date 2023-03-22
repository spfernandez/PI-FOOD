//aca traigo las funciones de los controllers y nada mas
const {getAllDiets} = require('../controllers/dietsController');

const getDietsHandler = async (req, res) => {

    try{
        const diets = await getAllDiets();
        res.status(200).send(diets)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDietsHandler
}