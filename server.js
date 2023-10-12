const { Pool } = require('pg');
const express = require('express');
const curriculosRouter = require('./routes/curriculos');

const pool = new Pool({
  user: 'bhbnsxqx',  // Seu usuário
  host: 'isabelle.db.elephantsql.com',  // Seu host
  database: 'bhbnsxqx',  // Seu banco de dados
  password: 'rxWPoC55mSOy41f_UzXw8BOCtiQz8T9T',  // Sua senha
  port: 5432,
  ssl: false
});

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use('/curriculos', curriculosRouter);

// Porta
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

