const express = require('express');
const validationMiddlewares = require('../middlewares/validationMiddlewares');
const salesControllers = require('../controllers/salesControllers');

const salesRoutes = express.Router();

salesRoutes.post('/', validationMiddlewares.salesValidations, salesControllers.insertSales);

salesRoutes.put('/:id', validationMiddlewares.salesValidations, salesControllers.updateSale);

salesRoutes.get('/:id', salesControllers.getSalesById);

salesRoutes.get('/', salesControllers.getAllSales);

salesRoutes.delete('/:id', salesControllers.deleteSale);

module.exports = salesRoutes;
