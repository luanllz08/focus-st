const db = require('../config/database');

const UsuarioModel = {
  buscarPorEmail(email) {
    const stmt = db.prepare(
      'SELECT * FROM usuarios WHERE email = ? AND deleted_at IS NULL'
    );
    return stmt.get(email.toLowerCase().trim());
  },

  buscarPorId(id) {
    const stmt = db.prepare(
      'SELECT id, name, email, role FROM usuarios WHERE id = ? AND deleted_at IS NULL'
    );
    return stmt.get(id);
  },

  criar(dados) {
    const stmt = db.prepare(
      'INSERT INTO usuarios (name, email, password_hash, role) VALUES (?, ?, ?, ?)'
    );
    const resultado = stmt.run(dados.name, dados.email.toLowerCase().trim(), dados.password_hash, dados.role || 'admin');
    return { id: resultado.lastInsertRowid };
  },
};

module.exports = UsuarioModel;
