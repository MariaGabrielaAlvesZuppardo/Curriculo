const express = require('express');
const router = express.Router();
const queries = require("db.js");

// Rotas
router.get('/curriculo', async (req, res) => {
  try {
    const results = await queries.selectResume();

    res.status(200).json(results);
  }

  catch (error) {
    res.status(500).send('Erro ao buscar dados do currículo: ' + error.message);
  }
});

module.exports = router;