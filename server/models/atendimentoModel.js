const db = require('../config/database');

const AtendimentoModel = {
  criar(dados) {
    const stmt = db.prepare(`
      INSERT INTO atendimentos (nome_completo, email, telefone, tipo_atendimento, descricao, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const resultado = stmt.run(
      dados.nome_completo.trim(),
      dados.email.trim().toLowerCase(),
      dados.telefone.trim(),
      dados.tipo_atendimento,
      dados.descricao.trim(),
      'Pendente'
    );
    return { id: resultado.lastInsertRowid };
  },

  buscarPorId(id) {
    const stmt = db.prepare(
      'SELECT * FROM atendimentos WHERE id = ? AND deleted_at IS NULL'
    );
    return stmt.get(id);
  },

  listar({ page = 1, limit = 10, status, tipo, order = 'desc', orderBy = 'created_at' }) {
    const colunasPermitidas = ['id', 'created_at', 'status', 'tipo_atendimento', 'nome_completo'];
    if (!colunasPermitidas.includes(orderBy)) orderBy = 'created_at';
    if (!['asc', 'desc'].includes(order)) order = 'desc';

    let where = 'WHERE deleted_at IS NULL';
    const params = [];

    if (status) {
      where += ' AND status = ?';
      params.push(status);
    }
    if (tipo) {
      where += ' AND tipo_atendimento = ?';
      params.push(tipo);
    }

    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM atendimentos ${where}`);
    const { total } = countStmt.get(...params);

    const offset = (page - 1) * limit;
    const dataStmt = db.prepare(
      `SELECT * FROM atendimentos ${where} ORDER BY ${orderBy} ${order} LIMIT ? OFFSET ?`
    );
    const data = dataStmt.all(...params, limit, offset);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  atualizarStatus(id, novoStatus) {
    const stmt = db.prepare(
      'UPDATE atendimentos SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL'
    );
    return stmt.run(novoStatus, id);
  },

  excluir(id) {
    const stmt = db.prepare(
      'UPDATE atendimentos SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL'
    );
    return stmt.run(id);
  },

  contarAtivos() {
    return db.prepare('SELECT COUNT(*) as total FROM atendimentos WHERE deleted_at IS NULL').get().total;
  },
};

module.exports = AtendimentoModel;
