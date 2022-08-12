const connection = require('./connection');

const productsModels = {
  getAllProducts: async () => {
    const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products;',
    );
    return products;
  },

  getById: async (id) => {
    const [product] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?;',
        [id],
      );
    return product;
  },

  insertProduct: async (name) => {
    const [{ insertId }] = await connection.execute(
      `INSERT INTO StoreManager.products (name)
        VALUES (?)`,
      [name],
    );
    return { id: insertId, name };
  },

  updateProduct: async ({ id, name }) => {
     await connection.execute(
       `UPDATE StoreManager.products
          SET name = ?
          WHERE id = ?;`,
       [name, id],
     );
      return { id, name };
  },
};

module.exports = productsModels;
