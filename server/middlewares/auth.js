const { verificarToken } = require('../utils/seguranca');
const { RoleUsuario } = require('../utils/enums');

function autenticar(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token de autenticação necessário.' });
  }

  const token = header.slice(7);
  try {
    const decoded = verificarToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Sessão expirada, faça login novamente.' });
    }
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

function autorizar(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ erro: 'Acesso não autorizado.' });
    }
    next();
  };
}

module.exports = { autenticar, autorizar };
