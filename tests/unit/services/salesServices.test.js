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

describe('Testa getSalesById de salesServices', () => {
    describe('Testa getById se o id passado é de um produto que existe no banco de dados', async () => {
      const sales = [
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 1,
        quantity: 5
    },
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 2,
        quantity: 10
    }
];
      before(async () => {
        sinon.stub(salesModels, 'getSalesById').resolves(sales);
      });

      after(async () => {
        salesModels.getSalesById.restore();
      });

      it('Testa se o retorno é um array', async () => {
        const response = await salesServices.getSalesById(1);

        expect(response).to.be.an('array');
      });
      it('Testa se o array retornado contém informações da sale buscada', async () => {
        const response = await salesServices.getSalesById(1);

        expect(response).to.be.equal(sales);
      });
    });

    describe('Testa getSalesById se o id passado é uma venda inexistente', async () => {
      const sales = [];

      before(async () => {
        sinon.stub(salesModels, 'getSalesById').resolves(sales);
      });

      after(async () => {
        salesModels.getSalesById.restore();
      });

      it('Testa se um erro é disparado quando um id inválido é passado', async () => {
        const response = await salesServices.getSalesById(50);

        expect(response).to.be.an('object');
      });
      it('Testa se o erro contém a mensagem Product not found', async () => {
        const response = await salesServices.getSalesById(50);

        expect(response).to.be.deep.equal({ message: 'Sale not found' });
      });
    });
});
  
describe('Testa função deleteSale de salesServices', () => {
    describe('Testa se, quando um id inválido é passado, retorna um erro', () => {
      const errorMessage = { message: 'Sale not found' };

      before(async () => {
        sinon.stub(salesModels, 'getSalesById').resolves([]);
        sinon.stub(salesModels, 'deleteSale').resolves(errorMessage);
    });

      after(async () => {
        salesModels.getSalesById.restore();
        salesModels.deleteSale.restore();
      });

      it('Testa se um objeto é retornado', async () => {
        const response = await salesServices.deleteSale('50');

        expect(response).to.be.an('object');
      });

      it('Testa se o objeto contém a mensagem de erro correta', async () => {
        const response = await salesServices.deleteSale('50');

        expect(response).to.be.deep.equal({ message: 'Sale not found' });
      });
    });

  describe('Testa se, quando um id válido é passado o retorno é correto', () => {
      const sales = [
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 1,
        quantity: 5
    },
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 2,
        quantity: 10
    }
];
      before(async () => {
        sinon.stub(salesModels, 'getSalesById').resolves(sales);
        sinon.stub(salesModels, 'deleteSale').resolves(true);
    });

      after(async () => {
        salesModels.getSalesById.restore();
        salesModels.deleteSale.restore();
      });

      it('Testa se um true é retornado', async () => {
        const response = await salesServices.deleteSale('1');

        expect(response).to.be.true;
      });
    });
});

describe('Testa função updateSale de productsServices', () => {
  describe('Testa se, quando um saleId válido é passado, retorna a sale atualizada', () => {
    const sales = [
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 1,
        quantity: 5
    },
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 2,
        quantity: 10
    }
    ];
    
    const salesToUpdate = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 4,
          "quantity": 5
        },
      ];

    beforeEach(async () => {
      sinon.stub(productsModels, 'getById').resolves([{ id: 1, name: 'Lævateinn' }]);
      sinon.stub(salesModels, 'getSalesById').resolves(sales);
      sinon.stub(salesModels, 'updateSale')
        .onFirstCall().resolves(salesToUpdate[0])
        .onSecondCall().resolves(salesToUpdate[1]);
    });

    afterEach(async () => {
      productsModels.getById.restore();
      salesModels.getSalesById.restore();
      salesModels.updateSale.restore();
    });

    it('Testa se um objeto é retornado', async () => {
      const response = await salesServices.updateSale(sales, 1);

      expect(response).to.be.an('object');
    });

    it('Testa se o objeto contém informações do produto inserido', async () => {
      const response = await salesServices.updateSale(sales, 1);

      expect(response).to.be.deep.equal({ saleId: 1, itemsUpdated: salesToUpdate });
    });
  });
      
  describe('Testa se, quando um saleId inválido é passado, retorna um erro', () => {
    const sales = [
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 1,
        quantity: 5
    },
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 2,
        quantity: 10
    }
    ];

    const errorMessage = { message: 'Sale not found' };

    beforeEach(async () => {
      sinon.stub(salesModels, 'updateSale').resolves(errorMessage);
    });

    afterEach(async () => {
      salesModels.updateSale.restore();
    });

    it('Testa se um objeto é retornado', async () => {
      const response = await salesServices.updateSale(sales, 50);

      expect(response).to.be.an('object');
    });

    it('Testa se o objeto contém a mensagem de erro correta', async () => {
      const response = await salesServices.updateSale(sales, 50);

      expect(response).to.be.deep.equal({ message: 'Sale not found', code: 404 });
    });
  });

  describe('Testa se, quando um productId inválido é passado, retorna um erro', () => {
    const sales = [
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 50,
        quantity: 5
    },
    {
        saleID: 1,
        date: '2022-08-15T19:08:32.000Z',
        productId: 60,
        quantity: 10
    }
    ];

    const errorMessage = { message: 'Product not found', code: 404 };

    beforeEach(async () => {
      sinon.stub(productsModels, 'getById')
        .onFirstCall().resolves([])
        .onSecondCall().resolves([]);
      sinon.stub(salesModels, 'updateSale').resolves(errorMessage);
    });

    afterEach(async () => {
      productsModels.getById.restore();
      salesModels.updateSale.restore();
    });

    it('Testa se um objeto é retornado', async () => {
      const response = await salesServices.updateSale(sales, 50);

      expect(response).to.be.an('object');
    });

    it('Testa se o objeto contém a mensagem de erro correta', async () => {
      const response = await salesServices.updateSale(sales, 50);

      expect(response).to.be.deep.equal({ message: 'Product not found', code: 404 });
    });
  });
});
