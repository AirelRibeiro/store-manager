const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

describe('Testa o funcionamento dos productsServices', () => {
  describe('Testa getAllProducts', () => {
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
  
  describe('Testa getById', () => {
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

  describe('Testa função insertProduct', () => {
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

    describe('Testa função updateProduct', () => {
    describe('Testa se, quando um name válido é passado, retorna o produto inserido', () => {
      const updatedProduct = { id: 1, name: 'Lævateinn' };

      before(async () => {
        sinon.stub(productsModels, 'updateProduct').resolves(updatedProduct);
    });

      after(async () => {
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
});
