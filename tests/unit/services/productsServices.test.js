const sinon = require('sinon');
const { expect } = require('chai');
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
