const express = require('express');
const router = express.Router();

// Conectar ao banco de dados
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

// Rotas
router.get('/', (req, res) => {
  client.query('SELECT * FROM curriculos', (err, result) => {
    if (err) throw err;
    res.json(result.rows);
  });
});

module.exports = router;
