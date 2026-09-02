const AuthService = require('../services/authService');

const AuthController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const resultado = await AuthService.autenticar(email, password, {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
      return res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
  },

  async me(req, res) {
    return res.status(200).json({
      user: {
        id: req.user.userId,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  },

  async logout(req, res) {
    return res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
  },
};

module.exports = AuthController;
