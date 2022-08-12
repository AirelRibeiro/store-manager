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

  insertProduct: async ({ name }) => {
    const validName = await productsValidations.validName(name);

    if (validName.error) {
      return { message: validName.error.details[0].message };
    }

    const insertedProduct = await productsModels.insertProduct({ name });

    return insertedProduct;
  },
};

module.exports = productsServices;
