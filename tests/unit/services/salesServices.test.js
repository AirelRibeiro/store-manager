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
          "quantity": 1
        },
        {
          "productId": 50,
          "quantity": 5
        },
        {
          "productId": 4,
          "quantity": 5
        }
      ];
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
          "quantity": 1
        },
        {
          "productId": 4,
          "quantity": 5
        },
      ];
      
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

describe('Testa getAllSales de salesServices', () => {
  describe('Testa se retornam todas as sales com informações corretas', () => {
    const sales = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];
      
    before(async () => {
      sinon.stub(salesModels, 'getAllSales').resolves(sales);
    });

    after(async () => {
      salesModels.getAllSales.restore();
    });

    it('Testa se o retorno é um array', async () => {
      const response = await salesServices.getAllSales();

      expect(response).to.be.an('array');
    });

    it('Testa se o array contém objetos com as chaves corretas', async () => {
      const response = await salesServices.getAllSales();

      expect(response[0]).to.be.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(response[1]).to.be.all.keys('saleId', 'date', 'productId', 'quantity');
    });

    it('Testa se as chaves do objeto possuem o valor correto', async () => {
      const response = await salesModels.getAllSales();

      expect(response[0]['saleId']).to.be.equals(1);
      expect(response[0]['date']).to.be.equals('2021-09-09T04:54:29.000Z');
      expect(response[0]['productId']).to.be.equals(1);
      expect(response[0]['quantity']).to.be.equals(2);

      expect(response[1]['saleId']).to.be.equals(1);
      expect(response[1]['date']).to.be.equals('2021-09-09T04:54:54.000Z');
      expect(response[1]['productId']).to.be.equals(2);
      expect(response[1]['quantity']).to.be.equals(2);
    });
  });
});