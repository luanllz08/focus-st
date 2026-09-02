const express = require('express');
const router = express.Router();
const AtendimentoController = require('../controllers/atendimentoController');
const { rateLimiterAtendimento } = require('../middlewares/rateLimiter');

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

router.post('/atendimentos', rateLimiterAtendimento, AtendimentoController.criarAtendimento);

module.exports = router;
