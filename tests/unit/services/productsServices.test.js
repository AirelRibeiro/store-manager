const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

  describe('Testa getAllProducts de productsServices', () => {
    describe('Testa getAllProducts, quando são listados todos os produtos do banco de dados', () => {
      const allProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(async () => {
        sinon.stub(productsModels, 'getAllProducts').resolves(allProducts);
      });

      after(async () => {
        productsModels.getAllProducts.restore();
      });

      it('Testa se o retorno é um array com objetos', async () => {
        const response = await productsServices.getAllProducts();

        expect(response).to.be.an('array');
      });

      it('Testa se os produtos retornados estão ordenados por Id', async () => {
        const response = await productsServices.getAllProducts();

        response.forEach(({ id }, index) => expect(id).to.be.equal(index + 1));
      });

      it('Testa se todos os produtos são retornados', async () => {
        const response = await productsServices.getAllProducts();

        expect(response).to.be.eql([
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ]);
      });
    });
  });

describe('Testa getById de productsServices', () => {
    describe('Testa getById se o id passado é de um produto que existe no banco de dados', async () => {
      const product = [{ id: 1, name: 'Martelo de Thor' }];

      before(async () => {
        sinon.stub(productsModels, 'getById').resolves(product);
      });

      after(async () => {
        productsModels.getById.restore();
      });

      it('Testa se o retorno é um objeto', async () => {
        const response = await productsServices.getById(1);

        expect(response).to.be.an('object');
      });
      it('Testa se o objeto retornado contém informações do produto buscado', async () => {
        const response = await productsServices.getById(1);

        expect(response).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
      });
    });

    describe('Testa getById se o id passado é de um produto não contido no banco de dados', async () => {
      const product = [];

      before(async () => {
        sinon.stub(productsModels, 'getById').resolves(product);
      });

      after(async () => {
        productsModels.getById.restore();
      });

      it('Testa se um erro é disparado quando um id inválido é passado', async () => {
        const response = await productsServices.getById(50);

        expect(response).to.be.an('object');
      });
      it('Testa se o erro contém a mensagem Product not found', async () => {
        const response = await productsServices.getById(50);

        expect(response).to.be.deep.equal({ message: 'Product not found' });
      });
    });
  });    

describe('Testa função insertProduct de productsServices', () => {
    describe('Testa se, quando um name válido é passado, retorna o produto inserido', () => {
      const insertedProduct = { id: 4, name: 'Lævateinn' };

      before(async () => {
        sinon.stub(productsModels, 'insertProduct').resolves(insertedProduct);
    });

      after(async () => {
        productsModels.insertProduct.restore();
      });

      it('Testa se um objeto é retornado', async () => {
        const response = await productsServices.insertProduct({ name: 'Lævateinn' });

        expect(response).to.be.an('object');
      });

      it('Testa se o objeto contém informações do produto inserido', async () => {
        const response = await productsServices.insertProduct({ name: 'Lævateinn' });

        expect(response).to.be.deep.equal({ id: 4, name: 'Lævateinn' });
      });
    });
  });

describe('Testa função updateProduct de productsServices', () => {
  describe('Testa se, quando um id válido é passado, retorna o produto inserido', () => {
    const updatedProduct = { id: 1, name: 'Lævateinn' };

    before(async () => {
      sinon.stub(productsModels, 'getById').resolves([{ id: 1, name: 'Lævateinn' }]);
      sinon.stub(productsModels, 'updateProduct').resolves(updatedProduct);
    });

    after(async () => {
      productsModels.getById.restore();
      productsModels.updateProduct.restore();
    });

    it('Testa se um objeto é retornado', async () => {
      const response = await productsServices.updateProduct({ id: 1, name: 'Lævateinn' });

      expect(response).to.be.an('object');
    });

    it('Testa se o objeto contém informações do produto inserido', async () => {
      const response = await productsServices.updateProduct({ id: 1, name: 'Lævateinn' });

      expect(response).to.be.deep.equal({ id: 1, name: 'Lævateinn' });
    });
  });
      
  describe('Testa se, quando um id inválido é passado, retorna um erro', () => {
    const errorMessage = { message: 'Product not found' };

    before(async () => {
      sinon.stub(productsModels, 'updateProduct').resolves(errorMessage);
    });

    after(async () => {
      productsModels.updateProduct.restore();
    });

    it('Testa se um objeto é retornado', async () => {
      const response = await productsServices.updateProduct({ id: 50, name: 'Lævateinn' });

      expect(response).to.be.an('object');
    });

    it('Testa se o objeto contém a mensagem de erro correta', async () => {
      const response = await productsServices.updateProduct({ id: 50, name: 'Lævateinn' });

      expect(response).to.be.deep.equal({ message: 'Product not found' });
    });
  });
});

describe('Testa função deleteProduct de productsServices', () => {
    describe('Testa se, quando um id inválido é passado, retorna um erro', () => {
      const errorMessage = { message: 'Product not found' };

      before(async () => {
        sinon.stub(productsModels, 'deleteProduct').resolves(errorMessage);
    });

      after(async () => {
        productsModels.deleteProduct.restore();
      });

      it('Testa se um objeto é retornado', async () => {
        const response = await productsServices.deleteProduct('50');

        expect(response).to.be.an('object');
      });

      it('Testa se o objeto contém a mensagem de erro correta', async () => {
        const response = await productsServices.deleteProduct('50');

        expect(response).to.be.deep.equal({ message: 'Product not found' });
      });
    });

    describe('Testa se, quando um id válido é passado o retorno é correto', () => {
      before(async () => {
        sinon.stub(productsModels, 'getById').resolves([{ id: 1, name: 'Martelo de Thor' }])
        sinon.stub(productsModels, 'deleteProduct').resolves(true);
    });

      after(async () => {
        productsModels.getById.restore();
        productsModels.deleteProduct.restore();
      });

      it('Testa se um true é retornado', async () => {
        const response = await productsServices.deleteProduct('1');

        expect(response).to.be.true;
      });
    });
});
  
describe('Testa searchByName de productsServices', () => {
  describe('Testa retorno caso seja passado um name válido', () => {
    const productsWithMartelo = [
      { id: 1, name: 'Martelo de Thor' }
    ];

    before(async () => {
      sinon.stub(productsModels, 'searchByName').resolves(productsWithMartelo);
    });

    after(async () => {
      productsModels.searchByName.restore();
    });

    it('Testa se retorno é um array contendo produtos escritos Martelo', async () => {
      const response = await productsServices.searchByName('Martelo');

      expect(response).to.be.equal(productsWithMartelo);
    });
  });

  describe('Testa retorno caso nenhum produto com aquele nome exista', () => {
    const allProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      before(async () => {
        sinon.stub(productsModels, 'searchByName').resolves([]);
        sinon.stub(productsModels, 'getAllProducts').resolves(allProducts);
      });

      after(async () => {
        productsModels.searchByName.restore();
        productsModels.getAllProducts.restore();
      });
    
    it('Testa se o o json é chamado com um array contendo todos os produtos', async () => {
      const response = await productsServices.searchByName('Espada');

      expect(response).to.be.equal(allProducts);
    });
  });
});
