const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('./config/env');
const { sanitizacaoGlobal } = require('./middlewares/sanitizacao');
const { tratarErros } = require('./middlewares/erros');
const { rateLimiterGeral } = require('./middlewares/rateLimiter');
const rotasPublicas = require('./routes/rotasPublicas');
const rotasAuth = require('./routes/rotasAuth');
const rotasAdmin = require('./routes/rotasAdmin');

function criarApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cors({
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(express.json({ limit: '10kb' }));

  app.use(rateLimiterGeral);
  app.use(sanitizacaoGlobal);

  app.use(express.static(path.join(__dirname, '../public')));

  app.use('/api', rotasPublicas);
  app.use('/api/auth', rotasAuth);
  app.use('/api/admin', rotasAdmin);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/login.html'));
  });

  app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/dashboard.html'));
  });

  app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada.' });
  });

  app.use(tratarErros);

  return app;
}

module.exports = criarApp;
