const productsModels = require('../models/productsModels');

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

  insertProduct: async (name) => {
    const insertedProduct = await productsModels.insertProduct(name);

    return insertedProduct;
  },
};

module.exports = productsServices;
