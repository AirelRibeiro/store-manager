const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');

describe('Testa o funcionamento de insertSale em salesModels', () => {
  const insertedSale = [{insertId: 4}];

      before(async () => {
        sinon.stub(connection, 'execute').resolves(insertedSale);
    });

      after(async () => {
        connection.execute.restore();
      });
    
    it('Testa se o um id é retornado', async () => {
      const response = await salesModels.insertSales();

        expect(response).to.be.a('number');
    });
    
    it('Testa se o id correto é retornado', async () => {
      const response = await salesModels.insertSales();

        expect(response).to.be.equal(4);
    });

});

describe('Testa o funcionamento de insertSalesProducts em salesModels', () => {
  const result = {};

      before(async () => {
        sinon.stub(connection, 'execute').resolves(result);
    });

      after(async () => {
        connection.execute.restore();
      });
    
    it('Testa se o um id é retornado', async () => {
      const response = await salesModels.insertSalesProducts(1, 4, 5);

        expect(response).to.be.an('object');
    });
    
    it('Testa se o id correto é retornado', async () => {
      const response = await salesModels.insertSalesProducts(1, 4, 5);

        expect(response).to.be.deep.equal({ productId: 4, quantity: 5 });
    });

});
