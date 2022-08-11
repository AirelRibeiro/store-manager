const productsModels = require('../models/productsModels');

const productsServices = {
  getAllProducts: async () => {
    const products = await productsModels.getAllProducts();

    return products;
  },
};

module.exports = productsServices;
