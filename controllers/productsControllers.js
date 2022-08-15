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

    if (updatedProduct.message) {
      return next({ message: updatedProduct.message, code: 404 });
    }

    return res.status(200).json(updatedProduct);
  },

  deleteProduct: async (req, res, next) => {
    const { id } = req.params;

    const deletedProduct = await productsServices.deleteProduct(id);

    if (deletedProduct.message) {
      return next({ message: deletedProduct.message, code: 404 });
    }

    return res.status(204).end();
  },

  searchByName: async (req, res) => {
    const { q } = req.query;
    const products = await productsServices.searchByName(q);
    return res.status(200).json(products);
  },
};

module.exports = productsControllers;
