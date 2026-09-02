const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('./env');

const dbDir = path.dirname(config.db.file);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(config.db.file);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 5000');

module.exports = db;
