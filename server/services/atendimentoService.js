const AtendimentoModel = require('../models/atendimentoModel');
const AuditoriaModel = require('../models/auditoriaModel');
const { validarDadosCriacao, validarStatus, validarTransicao } = require('../utils/validadores');
const { AcaoAuditoria } = require('../utils/enums');

const AtendimentoService = {
  async criar(dados, meta) {
    const erros = validarDadosCriacao(dados);
    if (erros.length > 0) {
      const erro = new Error('Dados inválidos.');
      erro.status = 400;
      erro.erros = erros;
      throw erro;
    }

    const { id } = AtendimentoModel.criar(dados);

    AuditoriaModel.registrar({
      id_atendimento: id,
      acao: AcaoAuditoria.CRIACAO,
      dados_novos: { ...dados, status: 'Pendente' },
      ip_origem: meta.ip,
      user_agent: meta.userAgent,
    });

    return { id };
  },

  async listar(filtros) {
    return AtendimentoModel.listar(filtros);
  },

  async buscarPorId(id) {
    const atendimento = AtendimentoModel.buscarPorId(id);
    if (!atendimento) {
      const erro = new Error('Atendimento não encontrado.');
      erro.status = 404;
      throw erro;
    }
    return atendimento;
  },

  async alterarStatus(id, novoStatus, meta) {
    if (!validarStatus(novoStatus)) {
      const erro = new Error('Status inválido.');
      erro.status = 400;
      throw erro;
    }

    const atendimento = AtendimentoModel.buscarPorId(id);
    if (!atendimento) {
      const erro = new Error('Atendimento não encontrado.');
      erro.status = 404;
      throw erro;
    }

    if (atendimento.status === novoStatus) {
      const erro = new Error('O status informado é o mesmo do status atual.');
      erro.status = 409;
      throw erro;
    }

    if (!validarTransicao(atendimento.status, novoStatus)) {
      const erro = new Error('Transição de status não permitida.');
      erro.status = 409;
      throw erro;
    }

    AtendimentoModel.atualizarStatus(id, novoStatus);

    AuditoriaModel.registrar({
      id_atendimento: id,
      id_usuario: meta.adminId,
      acao: AcaoAuditoria.ALTERACAO_STATUS,
      dados_anteriores: { status: atendimento.status },
      dados_novos: { status: novoStatus },
      ip_origem: meta.ip,
      user_agent: meta.userAgent,
    });

    return {
      id,
      status_anterior: atendimento.status,
      status_novo: novoStatus,
      data_alteracao: new Date().toISOString(),
    };
  },

  async excluir(id, meta) {
    const atendimento = AtendimentoModel.buscarPorId(id);
    if (!atendimento) {
      const erro = new Error('Atendimento não encontrado.');
      erro.status = 404;
      throw erro;
    }

    AtendimentoModel.excluir(id);

    AuditoriaModel.registrar({
      id_atendimento: id,
      id_usuario: meta.adminId,
      acao: AcaoAuditoria.EXCLUSAO,
      dados_anteriores: atendimento,
      ip_origem: meta.ip,
      user_agent: meta.userAgent,
    });

    return { id };
  },
};

module.exports = AtendimentoService;
