const rateLimit = require('express-rate-limit');
const config = require('../config/env');

function createLimiter(max, windowMs) {
  return rateLimit({
    windowMs: windowMs || config.rateLimit.windowMs,
    max: max || config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { erro: 'Muitas requisições. Tente novamente mais tarde.' },
  });
}

const rateLimiterGeral = createLimiter(config.rateLimit.max);
const rateLimiterLogin = createLimiter(config.rateLimit.loginMax);
const rateLimiterAtendimento = createLimiter(config.rateLimit.atendimentoMax);

module.exports = { rateLimiterGeral, rateLimiterLogin, rateLimiterAtendimento };
