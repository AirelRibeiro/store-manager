const express = require('express');
const productsControllers = require('../controllers/productsControllers');
const validateName = require('../middlewares/validationMiddlewares');

const productsRoutes = express.Router();

productsRoutes.get('/:id', productsControllers.getById);

productsRoutes.put('/:id', validateName, productsControllers.updateProduct);

productsRoutes.delete('/:id', validateName, productsControllers.deleteProduct);

productsRoutes.get('/', productsControllers.getAllProducts);

productsRoutes.post('/', validateName, productsControllers.insertProduct);

module.exports = productsRoutes;
