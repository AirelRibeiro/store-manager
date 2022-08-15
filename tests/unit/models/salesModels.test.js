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

describe('Testa o funcionamento de getAllSales em salesModels', () => {
  const result = [[
    {
      saleId: 1,
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2
    },
    {
      saleId: 1,
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2
    }
  ]];

      before(async () => {
        sinon.stub(connection, 'execute').resolves(result);
    });

      after(async () => {
        connection.execute.restore();
      });
    
    it('Testa se o um id é retornado', async () => {
      const response = await salesModels.getAllSales();

        expect(response).to.be.an('array');
    });
    
    it('Testa se o array contém objetos com as chaves corretas', async () => {
      const response = await salesModels.getAllSales();

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

describe('Testa getSalesById de salesModels', () => {
  describe('Testa getSalesById quando o id passado não existe no banco de dados', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('Testa se o retorno é um array', async () => {
      const response = await salesModels.getSalesById(50);

      expect(response).to.be.an('array');
    });
    it('Testa se o array retornado está vazio', async () => {
      const response = await salesModels.getSalesById(50);

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Testa getSalesById quando o id passado existe no banco de dados', () => {
    const sales = [[
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
    ]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(sales);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('Testa se o retorno é um array', async () => {
      const response = await salesModels.getSalesById(1);

      expect(response).to.be.an('array');
    });
    it('Testa se o array retornado contém informações das sales com o id fornecido', async () => {
      const response = await salesModels.getSalesById(1);

      expect(response).to.be.eql([
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
      ]);
    });
  });
});

describe('Testa deleteSale que exclui sale no banco de dados', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  after(async () => {
    connection.execute.restore();
  });
    
  it('Testa se o retorno é um boolean', async () => {
    const response = await salesModels.deleteSale('1');

    expect(response).to.be.true;
  });
});
  
describe('Testa updateSale que atualiza dados da sale em sales_products', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(true);
  });

  after(async () => {
    connection.execute.restore();
  });
    
  it('Testa se o array retornado não está vazio', async () => {
    const response = await salesModels.updateSale('1', '1', '1');

    expect(response).to.not.be.empty;
  });
    
  it('Testa se os dados do produto atualizado são retornados corretamente', async () => {
    const response = await salesModels.updateSale('1', '1', '1');

    expect(response).to.be.deep.equal({ productId: '1', quantity: '1' });
  });
});
