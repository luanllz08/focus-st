const db = require('../config/database');

const AuditoriaModel = {
  registrar(dados) {
    const stmt = db.prepare(`
      INSERT INTO trilha_auditoria (id_atendimento, id_usuario, acao, dados_anteriores, dados_novos, ip_origem, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      dados.id_atendimento || null,
      dados.id_usuario || null,
      dados.acao,
      dados.dados_anteriores ? JSON.stringify(dados.dados_anteriores) : null,
      dados.dados_novos ? JSON.stringify(dados.dados_novos) : null,
      dados.ip_origem || '0.0.0.0',
      dados.user_agent || 'Desconhecido'
    );
  },

  listarPorAtendimento(idAtendimento) {
    const stmt = db.prepare(
      'SELECT * FROM trilha_auditoria WHERE id_atendimento = ? ORDER BY created_at DESC'
    );
    return stmt.all(idAtendimento);
  },
};

module.exports = AuditoriaModel;
