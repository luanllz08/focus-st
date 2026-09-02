const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { rateLimiterLogin } = require('../middlewares/rateLimiter');
const { autenticar } = require('../middlewares/auth');

router.post('/login', rateLimiterLogin, AuthController.login);
router.post('/logout', autenticar, AuthController.logout);
router.get('/me', autenticar, AuthController.me);

module.exports = router;
