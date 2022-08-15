const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('Testa insertSales de salesControllers', () => {
  describe('Testa retorno quando o id fornecido não existe no banco de dados', () => {
      const errorMessage = { message: 'Product not found', code: 404 };

      before(async () => {
        sinon.stub(salesServices, 'insertSales').resolves(errorMessage);
      });

      after(async () => {
        salesServices.insertSales.restore();
      });
    
      it('Testa se o status de retorno é 404', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.params = { id: '50' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesControllers.insertSales(req, res, next);

        expect(res.status.calledWith(404)).to.be.true;
      });

      it('Testa se o o json é chamado com uma mensagem de erro', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.params = { id: '50' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesControllers.insertSales(req, res, next);

        expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
      });
  });
  
  describe('Testa retorno quando o id fornecido existe no banco de dados', () => {
      const insertedSales = [
    {
      "productId": 1,
      "quantity":1
          },
    {
      "productId": 4,
      "quantity":5
    }
  ];

      before(async () => {
        sinon.stub(salesServices, 'insertSales').resolves({ id: 8, itemsSold: insertedSales });
      });

      after(async () => {
        salesServices.insertSales.restore();
      });
    
      it('Testa se o status de retorno é 201', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesControllers.insertSales(req, res);

        expect(res.status.calledWith(201)).to.be.true;
      });

    it('Testa se é retornado um objeto com as informações corretas', async () => {
      const req = {};
      const res = {};
      const next = (err) => {
        if (err.message) {
          return res.status(err.code).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.insertSales(req, res);

      expect(res.json.calledWith({ id: 8, itemsSold: insertedSales })).to.be.true;
    });
  });
});
  
describe('Testa getAllSales de salesControllers', () => {
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
    sinon.stub(salesServices, 'getAllSales').resolves(sales);
  });

  after(async () => {
    salesServices.getAllSales.restore();
  });
    
  it('Testa se o status de retorno é 200', async () => {
    const req = {};
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.getAllSales(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });
  
  it('Testa se o status de retorno é 200', async () => {
    const req = {};
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControllers.getAllSales(req, res);

    expect(res.json.calledWith(sales)).to.be.true;
  });
});

describe('Testa getSalesById de salesControllers', () => {
  describe('Testa getSalesById quando o id fornecido não existe no banco de dados', () => {
    const errorMessage = { message: 'Sale not found' };

    before(async () => {
      sinon.stub(salesServices, 'getSalesById').resolves(errorMessage);
    });

    after(async () => {
      salesServices.getSalesById.restore();
    });
    
    it('Testa se o status de retorno é 404', async () => {
      const req = {};
      const res = {};
      const next = (err) => {
        if (err.message) {
          return res.status(err.code).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      req.params = { id: '50' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.getSalesById(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Testa se o o json é chamado com uma mensagem de erro', async () => {
      const req = {};
      const res = {};
      const next = (err) => {
        if (err.message) {
          return res.status(err.code).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }

      req.params = { id: '50' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.getSalesById(req, res, next);

      expect(res.json.calledWith(errorMessage)).to.be.true;
    });
  });

  describe('Testa getSalesById quando o id fornecido existe no banco de dados', () => {
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
      sinon.stub(salesServices, 'getSalesById').resolves(sales);
    });

    after(async () => {
      salesServices.getSalesById.restore();
    });
    
    it('Testa se o status de retorno é 200', async () => {
      const req = {};
      const res = {}

      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.getSalesById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Testa se o o json é chamado com um array contendo todos os produtos', async () => {
      const req = {};
      const res = {}

      req.params = { id: '1' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.getSalesById(req, res);

      expect(res.json.calledWith(sales)).to.be.true;
    });
  });
});

describe('Testa deleteSale de salesControllers', () => {
    describe('Testa deleteSale quando um id válido é passado', () => {
      before(async () => {
        sinon.stub(salesServices, 'deleteSale').resolves(true);
      });

      after(async () => {
        salesServices.deleteSale.restore();
      });
    
      it('Testa se o status de retorno é 204', async () => {
        const req = {};
        const res = {};

        req.params = { id: '1' };
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();

        await salesControllers.deleteSale(req, res);

        expect(res.status.calledWith(204)).to.be.true;
      });
    });

    describe('Testa deleteSale quando um id inválido é passado', () => {
      const errorMessage = { message: 'Sale not found' };

      before(async () => {
        sinon.stub(salesServices, 'deleteSale').resolves(errorMessage);
      });

      after(async () => {
        salesServices.deleteSale.restore();
      });
    
      it('Testa se o status de retorno é 404', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.params = { id: '50' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesControllers.deleteSale(req, res, next);

        expect(res.status.calledWith(404)).to.be.true;
      });

      it('Testa se o o json é chamado com erro correto', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }
      
        req.params = { id: '50' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesControllers.deleteSale(req, res, next);

        expect(res.json.calledWith(errorMessage)).to.be.true;
      });
    });
  });
