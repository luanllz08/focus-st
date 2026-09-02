const StatusAtendimento = Object.freeze({
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em Andamento',
  CONCLUIDO: 'Concluido',
  CANCELADO: 'Cancelado',
});

const TipoAtendimento = Object.freeze({
  DUVIDA: 'Duvida',
  SUGESTAO: 'Sugestao',
  RECLAMACAO: 'Reclamacao',
  SOLICITACAO: 'Solicitacao',
  ELOGIO: 'Elogio',
});

const RoleUsuario = Object.freeze({
  ADMIN: 'admin',
  VIEWER: 'viewer',
});

const AcaoAuditoria = Object.freeze({
  CRIACAO: 'CRIACAO',
  ALTERACAO_STATUS: 'ALTERACAO_STATUS',
  EXCLUSAO: 'EXCLUSAO',
  LOGIN_SUCESSO: 'LOGIN_SUCESSO',
  LOGIN_FALHA: 'LOGIN_FALHA',
});

const TransicoesPermitidas = Object.freeze([
  { origem: StatusAtendimento.PENDENTE, destino: StatusAtendimento.EM_ANDAMENTO },
  { origem: StatusAtendimento.PENDENTE, destino: StatusAtendimento.CANCELADO },
  { origem: StatusAtendimento.EM_ANDAMENTO, destino: StatusAtendimento.CONCLUIDO },
  { origem: StatusAtendimento.EM_ANDAMENTO, destino: StatusAtendimento.CANCELADO },
]);

const StatusPermitidos = Object.values(StatusAtendimento);
const TiposPermitidos = Object.values(TipoAtendimento);

module.exports = {
  StatusAtendimento,
  TipoAtendimento,
  RoleUsuario,
  AcaoAuditoria,
  TransicoesPermitidas,
  StatusPermitidos,
  TiposPermitidos,
};
