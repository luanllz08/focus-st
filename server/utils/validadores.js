const { StatusPermitidos, TiposPermitidos, TransicoesPermitidas } = require('./enums');

function validarEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function validarTelefone(telefone) {
  if (!telefone || typeof telefone !== 'string') return false;
  return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(telefone.trim());
}

function validarNome(nome) {
  if (!nome || typeof nome !== 'string') return false;
  const t = nome.trim();
  return t.length >= 3 && t.length <= 150;
}

function validarDescricao(desc) {
  if (!desc || typeof desc !== 'string') return false;
  return desc.trim().length >= 10 && desc.trim().length <= 2000;
}

function validarTipo(tipo) {
  return TiposPermitidos.includes(tipo);
}

function validarStatus(status) {
  return StatusPermitidos.includes(status);
}

function validarTransicao(statusAtual, novoStatus) {
  return TransicoesPermitidas.some(
    t => t.origem === statusAtual && t.destino === novoStatus
  );
}

function validarDadosCriacao(dados) {
  const erros = [];
  if (!validarNome(dados.nome_completo)) erros.push({ campo: 'nome_completo', mensagem: 'Nome deve ter entre 3 e 150 caracteres.' });
  if (!validarEmail(dados.email)) erros.push({ campo: 'email', mensagem: 'E-mail inválido.' });
  if (!validarTelefone(dados.telefone)) erros.push({ campo: 'telefone', mensagem: 'Telefone no formato (XX) XXXXX-XXXX.' });
  if (!validarTipo(dados.tipo_atendimento)) erros.push({ campo: 'tipo_atendimento', mensagem: 'Tipo de atendimento inválido.' });
  if (!validarDescricao(dados.descricao)) erros.push({ campo: 'descricao', mensagem: 'Descrição deve ter entre 10 e 2000 caracteres.' });
  return erros;
}

module.exports = {
  validarEmail,
  validarTelefone,
  validarNome,
  validarDescricao,
  validarTipo,
  validarStatus,
  validarTransicao,
  validarDadosCriacao,
};
