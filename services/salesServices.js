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

  deleteSale: async (id) => {
    const sale = await salesModels.getSalesById(id);

    if (sale.length === 0) {
      // throw new Error('Product not found');
      return { message: 'Sale not found' };
    }
    const deletedSale = await salesModels.deleteSale(id);

    return deletedSale;
  },

  updateSale: async (sales, saleId) => {
    const productIds = sales.map(({ productId }) => productId);
    const productsWithIds = await Promise.all(productIds.map((id) => productsModels.getById(id)));
    const areProducts = thereIsProduct(productsWithIds);

    if (areProducts.message) {
      return areProducts;
    }

    const isSale = await salesModels.getSalesById(saleId);

    if (isSale.length === 0) {
      return { message: 'Sale not found', code: 404 };
    }

    const updatedSales = await Promise
      .all(sales
        .map((sale) => salesModels.updateSale(sale.productId, sale.quantity, saleId)));
    
    return { saleId, itemsUpdated: updatedSales };
  },
};

module.exports = salesServices;
