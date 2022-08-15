const express = require('express');
const validationMiddlewares = require('../middlewares/validationMiddlewares');
const salesControllers = require('../controllers/salesControllers');

const salesRoutes = express.Router();

salesRoutes.post('/', validationMiddlewares.salesValidations, salesControllers.insertSales);

salesRoutes.get('/', salesControllers.getAllSales);

module.exports = salesRoutes;
