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
      })
  });
});
  