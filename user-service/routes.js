const express = require('express');
const router = express.Router();

const userController = require('./controller');
const authMiddleware = require('./middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
