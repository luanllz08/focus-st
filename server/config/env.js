const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'INSEGURO_MUDE_EM_PRODUCAO',
    expiration: parseInt(process.env.JWT_EXPIRATION, 10) || 3600,
  },
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
  db: {
    file: path.resolve(__dirname, '../../', process.env.DB_FILE || './database/focus_stt.db'),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
    loginMax: parseInt(process.env.RATE_LIMIT_LOGIN_MAX, 10) || 10,
    atendimentoMax: parseInt(process.env.RATE_LIMIT_ATENDIMENTO_MAX, 10) || 5,
  },
};
