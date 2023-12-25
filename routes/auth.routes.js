const express = require('express');
const authRoutes = express.Router();
const authMiddleware = require('../helpers/authenticated');
const authController = require('../controller/auth.controller');

authRoutes.get('/login', authController.showLogin);
authRoutes.post('/login', authController.login);

authRoutes.get('/register', authController.showRegister);
authRoutes.post('/register', authController.registerUser);

authRoutes.get('/logout', authMiddleware.isAuthenticated, authController.logout);

module.exports = authRoutes;
