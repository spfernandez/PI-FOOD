const {Router} = require('express');
//aca traigo los handlers
const { getDietsHandler } = require('../handlers/dietsHandler');

const dietsRoutes = Router();

dietsRoutes.get('/', getDietsHandler);



module.exports = dietsRoutes;