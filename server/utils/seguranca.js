const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

async function hashSenha(senha) {
  return bcrypt.hash(senha, config.bcryptRounds);
}

async function compararSenhas(senha, hash) {
  return bcrypt.compare(senha, hash);
}

function gerarToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    algorithm: 'HS256',
    expiresIn: config.jwt.expiration,
  });
}

function verificarToken(token) {
  return jwt.verify(token, config.jwt.secret, { algorithms: ['HS256'] });
}

module.exports = { hashSenha, compararSenhas, gerarToken, verificarToken };
