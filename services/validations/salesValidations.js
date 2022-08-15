const thereIsProduct = (arrayOfProducts) => {
  let isProduct = true;
  arrayOfProducts.forEach((product) => {
    if (product.length === 0) {
      isProduct = { message: 'Product not found', code: 404 };
    }
  });
  
  return isProduct;
};

module.exports = thereIsProduct;
