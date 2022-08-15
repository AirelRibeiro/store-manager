const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const productsRoutes = express.Router();

productsRoutes.get('/:id', productsControllers.getById);

productsRoutes.put('/:id', validationMiddlewares.validateName, productsControllers.updateProduct);

productsRoutes.delete('/:id', productsControllers.deleteProduct);

productsRoutes.get('/', productsControllers.getAllProducts);

productsRoutes.post('/', validationMiddlewares.validateName, productsControllers.insertProduct);

module.exports = productsRoutes;
