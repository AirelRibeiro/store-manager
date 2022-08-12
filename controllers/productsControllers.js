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

  insertProduct: async (req, res) => {
    const { name } = req.body;
    const insertedProduct = await productsControllers.insertProduct({ name });

    return res.status(201).json(insertedProduct);
  },
};

module.exports = productsControllers;