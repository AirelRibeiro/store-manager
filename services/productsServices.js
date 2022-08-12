const productsModels = require('../models/productsModels');
const productsValidations = require('./validations/productsValidations');

const productsServices = {
  getAllProducts: async () => {
    const products = await productsModels.getAllProducts();

    return products;
  },

  getById: async (id) => {
    const [product] = await productsModels.getById(id);

    if (!product) {
      // throw new Error('Product not found');
      return { message: 'Product not found' };
    }

    return product;
  },

};

module.exports = productsServices;
