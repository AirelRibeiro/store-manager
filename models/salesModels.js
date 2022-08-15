const connection = require('./connection');

const salesModels = {
  insertSales: async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ();',
    );
    return insertId;
  },

  insertSalesProducts: (saleId, productId, quantity) => connection.execute(
      'INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);',
      [productId, saleId, quantity],
    ).then(() => ({ productId, quantity })),
};

module.exports = salesModels;
