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
  
  getAllSales: async () => {
    const [sales] = await connection.execute(`
      SELECT 
        sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
        FROM StoreManager.sales_products AS sp
        JOIN StoreManager.sales AS s
        ON sp.sale_id = s.id
        ORDER BY saleID, productId;
    `);
    
    return sales;
  },

  getSalesById: async (id) => {
    const [sales] = await connection.execute(`
      SELECT 
        sp.sale_id AS saleID, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
        FROM StoreManager.sales_products AS sp
        JOIN StoreManager.sales AS s
        ON sp.sale_id = s.id
        WHERE sp.sale_id = ?
        ORDER BY saleID, productId;
    `,
      [id]);
    
    return sales;
  },

  deleteSale: (id) => connection.execute(
    `DELETE FROM StoreManager.sales
      WHERE id = ?;`,
    [id],
  ).then(() => true),
};

module.exports = salesModels;
