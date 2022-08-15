const salesServices = require('../services/salesServices');

const salesControllers = {
  insertSales: async (req, res, next) => {
    const { body } = req;
    const insertdSales = await salesServices.insertSales(body);

    if (insertdSales.message) {
      return next(insertdSales);
    }
    return res.status(201).json(insertdSales);
  },

   getAllSales: async (_req, res) => {
    const sales = await salesServices.getAllSales();

    return res.status(200).json(sales);
  },
};

module.exports = salesControllers;
