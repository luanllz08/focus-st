const UsuarioModel = require('../models/usuarioModel');
const AuditoriaModel = require('../models/auditoriaModel');
const { compararSenhas, gerarToken } = require('../utils/seguranca');
const { AcaoAuditoria } = require('../utils/enums');

const AuthService = {
  async autenticar(email, password, meta) {
    if (!email || !password) {
      const erro = new Error('Preencha e-mail e senha.');
      erro.status = 400;
      throw erro;
    }

    const usuario = UsuarioModel.buscarPorEmail(email);

    if (!usuario) {
      AuditoriaModel.registrar({
        acao: AcaoAuditoria.LOGIN_FALHA,
        dados_novos: { email },
        ip_origem: meta.ip,
        user_agent: meta.userAgent,
      });
      const erro = new Error('E-mail ou senha incorretos.');
      erro.status = 401;
      throw erro;
    }

    const senhaValida = await compararSenhas(password, usuario.password_hash);
    if (!senhaValida) {
      AuditoriaModel.registrar({
        id_usuario: usuario.id,
        acao: AcaoAuditoria.LOGIN_FALHA,
        dados_novos: { email },
        ip_origem: meta.ip,
        user_agent: meta.userAgent,
      });
      const erro = new Error('E-mail ou senha incorretos.');
      erro.status = 401;
      throw erro;
    }

    const token = gerarToken({
      userId: usuario.id,
      role: usuario.role,
    });

    AuditoriaModel.registrar({
      id_usuario: usuario.id,
      acao: AcaoAuditoria.LOGIN_SUCESSO,
      ip_origem: meta.ip,
      user_agent: meta.userAgent,
    });

    return {
      token,
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
      },
    };
  },
};

module.exports = AuthService;
