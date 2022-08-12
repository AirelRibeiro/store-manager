const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('Testa o funcionamento de productsControllers', () => {
  describe('Testa getAllProducts quando são retornados todos os produtos', () => {
    const allProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(async () => {
        sinon.stub(productsServices, 'getAllProducts').resolves(allProducts);
      });

      after(async () => {
        productsServices.getAllProducts.restore();
      });
    
    it('Testa se o status de retorno é 200', async () => {
      const req = {};
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Testa se o o json é chamado com um array contendo todos os produtos', async () => {
      const req = {};
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.getAllProducts(req, res);

      expect(res.json.calledWith(allProducts)).to.be.true;
    });
  });

  describe('Testa getById', () => {
    describe('Testa getById quando o id fornecido não existe no banco de dados', () => {
      const errorMessage = { message: 'Product not found' };

      before(async () => {
        sinon.stub(productsServices, 'getById').resolves(errorMessage);
      });

      after(async () => {
        productsServices.getById.restore();
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

        req.params = { id: '1' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.getById(req, res, next);

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

        await productsControllers.getById(req, res, next);

        expect(res.json.calledWith(errorMessage)).to.be.true;
      });
    });

    describe('Testa getById quando o id fornecido existe no banco de dados', () => {
      const product = [{ id: 1, name: 'Martelo de Thor' }];

      before(async () => {
        sinon.stub(productsServices, 'getById').resolves(product);
      });

      after(async () => {
        productsServices.getById.restore();
      });
    
      it('Testa se o status de retorno é 200', async () => {
        const req = {};
        const res = {}

        req.params = { id: '1' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.getById(req, res);

        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Testa se o o json é chamado com um array contendo todos os produtos', async () => {
        const req = {};
        const res = {}

        req.params = { id: '1' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.getById(req, res);

        expect(res.json.calledWith(product)).to.be.true;
      });
    });
  });

  describe('Testa insertProduct', () => {
    describe('Testa insertProduct quando um name válido é passado', () => {
      const insertedProduct = { id: 4, name: 'Lævateinn' };

      before(async () => {
        sinon.stub(productsServices, 'insertProduct').resolves(insertedProduct);
      });

      after(async () => {
        productsServices.insertProduct.restore();
      });
    
      it('Testa se o status de retorno é 201', async () => {
        const req = {};
        const res = {};

        req.body = { name: 'Lævateinn' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.insertProduct(req, res);

        expect(res.status.calledWith(201)).to.be.true;
      });

      it('Testa se o o json é chamado com o produto inserido', async () => {
        const req = {};
        const res = {};
      
        req.body = { name: 'Lævateinn' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.insertProduct(req, res);

        expect(res.json.calledWith(insertedProduct)).to.be.true;
      });
    });
  });
});
