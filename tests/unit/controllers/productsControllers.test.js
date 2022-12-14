const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

  describe('Testa getAllProducts de productsControllers quando são retornados todos os produtos', () => {
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

  describe('Testa getById de productsControllers', () => {
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

    describe('Testa insertProduct de productsControllers', () => {
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

  describe('Testa updateProduct de productsControllers', () => {
    describe('Testa updateProduct quando um id válido é passado', () => {
      const updatedProduct = { id: 1, name: 'Lævateinn' };

      before(async () => {
        sinon.stub(productsServices, 'updateProduct').resolves(updatedProduct);
      });

      after(async () => {
        productsServices.updateProduct.restore();
      });
    
      it('Testa se o status de retorno é 200', async () => {
        const req = {};
        const res = {};

        req.body = { name: 'Lævateinn' };
        req.params = { id: '1' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.updateProduct(req, res);

        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Testa se o o json é chamado com o produto inserido', async () => {
        const req = {};
        const res = {};
      
        req.body = { name: 'Lævateinn' };
        req.params = { id: '1' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.updateProduct(req, res);

        expect(res.json.calledWith(updatedProduct)).to.be.true;
      });
    });

    describe('Testa updateProduct quando um id inválido é passado', () => {
      const errorMessage = { message: 'Product not found' };

      before(async () => {
        sinon.stub(productsServices, 'updateProduct').resolves(errorMessage);
      });

      after(async () => {
        productsServices.updateProduct.restore();
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

        req.body = { name: 'Lævateinn' };
        req.params = { id: '50' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.updateProduct(req, res, next);

        expect(res.status.calledWith(404)).to.be.true;
      });

      it('Testa se o o json é chamado com o produto inserido', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }
      
        req.body = { name: 'Lævateinn' };
        req.params = { id: '1' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await productsControllers.updateProduct(req, res, next);

        expect(res.json.calledWith(errorMessage)).to.be.true;
      });
    });
  });

describe('Testa deleteProduct de productsControllers', () => {
  describe('Testa deleteProduct quando um id válido é passado', () => {
    before(async () => {
      sinon.stub(productsServices, 'deleteProduct').resolves(true);
    });

    after(async () => {
      productsServices.deleteProduct.restore();
    });
    
    it('Testa se o status de retorno é 204', async () => {
      const req = {};
      const res = {};

      req.params = { id: '1' };
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await productsControllers.deleteProduct(req, res);

      expect(res.status.calledWith(204)).to.be.true;
    });
  });

  describe('Testa deleteProduct quando um id inválido é passado', () => {
    const errorMessage = { message: 'Product not found' };

    before(async () => {
      sinon.stub(productsServices, 'deleteProduct').resolves(errorMessage);
    });

    after(async () => {
      productsServices.deleteProduct.restore();
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

      req.body = { name: 'Lævateinn' };
      req.params = { id: '50' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.deleteProduct(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Testa se o o json é chamado com o produto inserido', async () => {
      const req = {};
      const res = {};
      const next = (err) => {
        if (err.message) {
          return res.status(err.code).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Erro no servidor' });
      }
      
      req.body = { name: 'Lævateinn' };
      req.params = { id: '1' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.deleteProduct(req, res, next);

      expect(res.json.calledWith(errorMessage)).to.be.true;
    });
  });
});

describe('Testa searchByName', () => {
  describe('Testa retorno caso seja passado um name válido', () => {
    const productsWithMartelo = [
      { id: 1, name: 'Martelo de Thor' }
    ];

    before(async () => {
      sinon.stub(productsServices, 'searchByName').resolves(productsWithMartelo);
    });

    after(async () => {
      productsServices.searchByName.restore();
    });
    
    it('Testa se o status de retorno é 200', async () => {
      const req = {};
      const res = {}

      req.query = { q: 'Martelo' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.searchByName(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Testa se o o json é chamado com um array contendo todos os produtos', async () => {
      const req = {};
      const res = {}

      req.query = { q: 'Martelo' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.searchByName(req, res);

      expect(res.json.calledWith(productsWithMartelo)).to.be.true;
    });
  });

  describe('Testa retorno caso nenhum produto com aquele nome exista', () => {
    const allProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(async () => {
        sinon.stub(productsServices, 'searchByName').resolves(allProducts);
      });

      after(async () => {
        productsServices.searchByName.restore();
      });
    
    it('Testa se o status de retorno é 200', async () => {
      const req = {};
      const res = {}

      req.query = { q: 'Espada' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.searchByName(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Testa se o o json é chamado com um array contendo todos os produtos', async () => {
      const req = {};
      const res = {}

      req.query = { q: 'Espada' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsControllers.searchByName(req, res);

      expect(res.json.calledWith(allProducts)).to.be.true;
    });
  });
});
