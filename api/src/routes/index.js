const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipeRoutes = require('./recipeRoutes');
const dietsRoutes = require('./dietsRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/recipes', recipeRoutes);
 router.use('/diets', dietsRoutes);

module.exports = router;
