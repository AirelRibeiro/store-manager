const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

describe('Testa o funcionamento dos productsModels', () => {
  describe('Testa getAllProducts, quando são listados todos os produtos do banco de dados', () => {
    const allProducts = [
      [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(allProducts);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Testa se o retorno é um array com objetos', async () => {
      const response = await productsModels.getAllProducts();

      expect(response).to.be.an('array');
    });
    it('Testa se os produtos retornados estão ordenados por Id', async () => {
      const response = await productsModels.getAllProducts();

      response.forEach(({ id }, index) => expect(id).to.be.equal(index + 1));
    });
    it('Testa se todos os produtos são retornados', async () => {
      const response = await productsModels.getAllProducts();

      expect(response).to.be.eql([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]);
    });
  });

  describe('Testa getById quando o id passado não existe no banco de dados', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('Testa se o retorno é um array', async () => {
      const response = await productsModels.getById(50);

      expect(response).to.be.an('array');
    });
    it('Testa se o array retornado está vazio', async () => {
      const response = await productsModels.getById(50);

      expect(response).to.be.an('array').that.is.empty;
    });
  });

  describe('Testa getById quando o id passado existe no banco de dados', () => {
    const product = [[{ id: 1, name: 'Martelo de Thor' }]];

      before(async () => {
        sinon.stub(connection, 'execute').resolves(product);
    });

      after(async () => {
        connection.execute.restore();
    });
      it('Testa se o retorno é um array', async () => {
        const response = await productsModels.getById(1);

        expect(response).to.be.an('array');
    });
      it('Testa se o array retornado contém informações do produto buscado', async () => {
        const response = await productsModels.getById(1);

        expect(response).to.be.deep.equal([{ id: 1, name: "Martelo de Thor" }]);
    });
  });

  describe('Testa insertProduct, que insere produto no banco de dados', async () => {
    const insertedProduct = [{insertId: 4}];

      before(async () => {
        sinon.stub(connection, 'execute').resolves(insertedProduct);
    });

      after(async () => {
        connection.execute.restore();
      });
    
    it('Testa se o array retornado não está vazio', async () => {
      const response = await productsModels.insertProduct('Lævateinn');

        expect(response).to.not.be.empty;
    });
    
    it('Testa se os dados do produto inserido são retornados corretamente', async () => {
      const response = await productsModels.insertProduct('Lævateinn');

        expect(response).to.be.deep.equal({ id: 4, name: 'Lævateinn' });
    });

  });

  describe('Testa updateProduct que atualiza dados de produto no banco de dados', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(true);
    });

      after(async () => {
        connection.execute.restore();
      });
    
    it('Testa se o array retornado não está vazio', async () => {
      const response = await productsModels.updateProduct({ id: '1', name: 'Lævateinn'});

        expect(response).to.not.be.empty;
    });
    
    it('Testa se os dados do produto atualizado são retornados corretamente', async () => {
      const response = await productsModels.updateProduct('Lævateinn');

        expect(response).to.be.deep.equal({ id: '1', name: 'Lævateinn'});
    });
  });
});
