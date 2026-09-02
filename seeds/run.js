const bcrypt = require('bcrypt');
const db = require('../server/config/database');
const config = require('../server/config/env');

const email = process.env.SEED_ADMIN_EMAIL || 'admin@focussstt.com';
const senha = process.env.SEED_ADMIN_PASSWORD || 'admin123456';
const nome = process.env.SEED_ADMIN_NAME || 'Administrador';

async function seed() {
  const existente = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email.toLowerCase());
  if (existente) {
    console.log('Usuário admin já existe, seed ignorado.');
    db.close();
    return;
  }

  const hash = await bcrypt.hash(senha, config.bcryptRounds);

  db.prepare('INSERT INTO usuarios (name, email, password_hash, role) VALUES (?, ?, ?, ?)')
    .run(nome, email.toLowerCase(), hash, 'admin');

  console.log(`Usuário admin criado: ${email}`);
  console.log('IMPORTANTE: altere a senha padrão em produção.');
  db.close();
}

seed().catch(err => {
  console.error('Erro no seed:', err);
  db.close();
  process.exit(1);
});
