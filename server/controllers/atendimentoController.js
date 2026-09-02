const AtendimentoService = require('../services/atendimentoService');

const AtendimentoController = {
  async criarAtendimento(req, res, next) {
    try {
      const resultado = await AtendimentoService.criar(req.body, {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
      return res.status(201).json({
        id: resultado.id,
        mensagem: 'Atendimento criado com sucesso.',
      });
    } catch (err) {
      next(err);
    }
  },

  async listarAtendimentos(req, res, next) {
    try {
      const page = Math.max(1, parseInt(req.query.page, 10) || 1);
      const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
      const resultado = await AtendimentoService.listar({
        page,
        limit,
        status: req.query.status,
        tipo: req.query.tipo,
        order: req.query.order,
        orderBy: req.query.orderBy,
      });
      return res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID inválido.' });
      }
      const atendimento = await AtendimentoService.buscarPorId(id);
      return res.status(200).json(atendimento);
    } catch (err) {
      next(err);
    }
  },

  async alterarStatus(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID inválido.' });
      }
      const resultado = await AtendimentoService.alterarStatus(id, req.body.status, {
        adminId: req.user.userId,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
      return res.status(200).json(resultado);
    } catch (err) {
      next(err);
    }
  },

  async excluir(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: 'ID inválido.' });
      }
      await AtendimentoService.excluir(id, {
        adminId: req.user.userId,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
      return res.status(200).json({
        id,
        mensagem: 'Atendimento excluído com sucesso.',
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AtendimentoController;
