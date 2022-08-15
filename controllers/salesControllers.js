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
   
  getSalesById: async (req, res, next) => {
    const { id } = req.params;
    const sales = await salesServices.getSalesById(id);

    if (sales.message) {
      return next({ message: sales.message, code: 404 });
    }

    return res.status(200).json(sales);
  },

  deleteSale: async (req, res, next) => {
    const { id } = req.params;

    const deletedSale = await salesServices.deleteSale(id);

    if (deletedSale.message) {
      return next({ message: deletedSale.message, code: 404 });
    }

    return res.status(204).end();
  },
};

module.exports = salesControllers;
