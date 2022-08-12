const sinon = require('sinon');
const { expect } = require('chai');
const validateName = require('../../../middlewares/validationMiddlewares');

describe('Testa validateName', () => {
    describe('Testa validateName quando name não é oferecido', () => {
      it('Testa se o status de retorno é 400', () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.body = {}
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        validateName(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Testa se o o json é chamado com uma mensagem de erro', () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        validateName(req, res, next);

        expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
      });
    });
  
    describe('Testa validateName quando name tem menos de 5 caracteres', () => {
      it('Testa se o status de retorno é 422', () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.body = { name: 'Abc' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        validateName(req, res, next);

        expect(res.status.calledWith(422)).to.be.true;
      });

      it('Testa se o o json é chamado com uma mensagem de erro', () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.body = { name: 'Abc' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        validateName(req, res, next);

        expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.true;
      });
    });
  });
