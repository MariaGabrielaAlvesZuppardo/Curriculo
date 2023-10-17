const { Pool } = require('pg');
const express = require('express');
const curriculosRouter = require('./routes/curriculos');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/curriculos', curriculosRouter);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
