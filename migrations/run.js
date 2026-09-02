const fs = require('fs');
const path = require('path');
const db = require('../server/config/database');

const dir = __dirname;
const arquivos = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();

db.transaction(() => {
  for (const arquivo of arquivos) {
    const sql = fs.readFileSync(path.join(dir, arquivo), 'utf8');
    console.log(`Aplicando migration: ${arquivo}`);
    db.exec(sql);
  }
})();

console.log('Migrations aplicadas com sucesso.');
db.close();
