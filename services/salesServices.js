const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');
const thereIsProduct = require('./validations/salesValidations');

const salesServices = {
  insertSales: async (sales) => {
    const productIds = sales.map(({ productId }) => productId);
    const productsWithIds = await Promise.all(productIds.map((id) => productsModels.getById(id)));
    const areProducts = thereIsProduct(productsWithIds);

    if (areProducts.message) {
      return areProducts;
    }
    const insertedId = await salesModels.insertSales();
    const insertedSales = await Promise
      .all(sales
        .map((sale) => salesModels.insertSalesProducts(insertedId, sale.productId, sale.quantity)));
    
    return { id: insertedId, itemsSold: insertedSales };
  },

  getAllSales: async () => {
    const sales = await salesModels.getAllSales();

    return sales;
  },

  getSalesById: async (id) => {
    const sales = await salesModels.getSalesById(id);

    if (sales.length === 0) {
      // throw new Error('Product not found');
      return { message: 'Sale not found' };
    }

    return sales;
  },
};

module.exports = salesServices;
