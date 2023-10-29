const { Pool } = require('pg');
const express = require('express');
const curriculosRouter = require('./routes/curriculos');
const authRouter = require('./routes/autorização');
const dotenv = require('dotenv');
const cors = require('cors');
const {firebaseConfig} = require('./firebaseConfiguration')
const { initializeApp } = require('firebase/app');

dotenv.config();

const firebaseApp = initializeApp(firebaseConfig)
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/curriculos', curriculosRouter);
app.use('/autorizacao', authRouter);

// Porta
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
