const { Pool } = require('pg');
const express = require('express');
const curriculosRouter = require('./routes/curriculos');

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/curriculos', curriculosRouter);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});