const productsServices = require('../services/productsServices');

const productsControllers = {
  getAllProducts: async (_req, res) => {
    const products = await productsServices.getAllProducts();

    return res.status(200).json(products);
  },

  getById: async (req, res, next) => {
    const { id } = req.params;
    const product = await productsServices.getById(id);

    if (product.message) {
      return next({ message: product.message, code: 404 });
    }

    return res.status(200).json(product);
  },

  insertProduct: async (req, res, _next) => {
    const { name } = req.body;
    const insertedProduct = await productsServices.insertProduct(name);

    return res.status(201).json(insertedProduct);
  },

  updateProduct: async (req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;

    const updatedProduct = await productsServices.updateProduct({ id, name });
    console.log('🚀 ~ file: productsControllers.js ~ line 33 ~ updateProduct: ~ updatedProduct', updatedProduct);

    if (updatedProduct.message) {
      return next({ message: updatedProduct.message, code: 404 });
    }

    return res.status(200).json(updatedProduct);
  },
};

module.exports = productsControllers;
