const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const productsRoutes = express.Router();

productsRoutes.get('/:id', productsControllers.getById);

productsRoutes.get('/', productsControllers.getAllProducts);

productsRoutes.post('/', validationMiddlewares, productsControllers.insertProduct);

module.exports = productsRoutes;
