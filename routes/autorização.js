const express = require('express');
const router = express.Router();
const {
    isAuthenticated,
    makeUserAdmin,
    checkIfAdmin,
    login,
    signup,
} = require('../authorization/firebaseAuth');

// Rota para login
router.post('/login', login);

// Rota para signup
router.post('/signup', signup);

// Rota para fazer um usuário admin (requer autenticação)
router.post('/makeUserAdmin', isAuthenticated, makeUserAdmin);

// Rota para verificar se um usuário é admin (requer autenticação)
router.get('/checkIfAdmin', isAuthenticated, checkIfAdmin);

module.exports = router;
