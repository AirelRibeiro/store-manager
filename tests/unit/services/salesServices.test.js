const sinon = require('sinon');
const { expect } = require('chai');
const salesModels = require('../../../models/salesModels');
const productsModels = require('../../../models/productsModels');
const salesServices = require('../../../services/salesServices');

  describe('Testa insertSales de salesServices', () => {
    describe('Testa retorno caso algum id passado não existe', () => {
      const salesToInsert = [
    {
      "productId": 1,
      "quantity":1
          },
        {
      "productId": 50,
      "quantity":5
    },
    {
      "productId": 4,
      "quantity":5
    }
  ]
        const errorMessage = { message: 'Product not found', code: 404 };
        const products = [[{ id: 1, name: 'Martelo de Thor' }], [], [{ id: 4, name: 'Lævateinn' }]];

      before(async () => {
        sinon.stub(salesModels, 'insertSales').resolves(errorMessage);
        sinon.stub(productsModels, 'getById')
          .onFirstCall().resolves(products[0])
          .onSecondCall().resolves(products[1])
          .onThirdCall().resolves(products[2]);
    });

      after(async () => {
        salesModels.insertSales.restore();
        productsModels.getById.restore();
      });

      it('Testa se o retorno é um objeto', async () => {
        const response = await salesServices.insertSales(salesToInsert);

        expect(response).to.be.an('object');
        expect(response).to.be.eql({ message: 'Product not found', code: 404 });
      });
    });

    describe('Testa retorno caso todos os ids existam no banco de dados', () => {
      const salesToInsert = [
    {
      "productId": 1,
      "quantity":1
          },
    {
      "productId": 4,
      "quantity":5
    }
  ]
      const products = [[{ id: 1, name: 'Martelo de Thor' }], [{ id: 4, name: 'Lævateinn' }]];

      before(async () => {
        sinon.stub(salesModels, 'insertSales').resolves(8);

        sinon.stub(productsModels, 'getById')
          .onFirstCall().resolves(products[0])
          .onSecondCall().resolves(products[1]);
        
        sinon.stub(salesModels, 'insertSalesProducts')
          .onFirstCall().resolves({ productId: 1, quantity: 1 })
          .onSecondCall().resolves({ productId: 4, quantity: 5 });
    });

      after(async () => {
        salesModels.insertSales.restore();
        productsModels.getById.restore();
        salesModels.insertSalesProducts.restore();
      });

      it('Testa se o retorno é um objeto', async () => {
        const response = await salesServices.insertSales(salesToInsert);

        expect(response).to.be.an('object');
        expect(response).to.be.eql({ id: 8, itemsSold: salesToInsert });
      });
    });
  });
