const express = require('express');
const swaggerUi = require('swagger-ui-express');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/products', productsRoutes);

app.use('/sales', salesRoutes);

app.use((err, req, res, _next) => {
  if (err.message) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Erro no servidor' });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;