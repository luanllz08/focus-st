const xss = require('xss');

function sanitizarObjeto(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return xss(obj.trim());
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizarObjeto);
  }
  if (typeof obj === 'object') {
    const limpo = {};
    for (const [chave, valor] of Object.entries(obj)) {
      limpo[chave] = sanitizarObjeto(valor);
    }
    return limpo;
  }
  return obj;
}

function sanitizacaoGlobal(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizarObjeto(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizarObjeto(req.query);
  }
  next();
}

module.exports = { sanitizacaoGlobal, sanitizarObjeto };
