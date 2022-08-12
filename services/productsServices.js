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

  updateProduct: async ({ id, name }) => {
    const product = await productsModels.getById(id);

    if (product.length === 0) {
      // throw new Error('Product not found');
      return { message: 'Product not found' };
    }
    const updatedProduct = await productsModels.updateProduct(id, name);

    return updatedProduct;
  },

  deleteProduct: async (id) => {
    const product = await productsModels.getById(id);

    if (product.length === 0) {
      // throw new Error('Product not found');
      return { message: 'Product not found' };
    }
    const deletedProduct = await productsModels.deleteProduct(id);

    return deletedProduct;
  },
};

module.exports = productsServices;
