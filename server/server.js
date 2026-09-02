const criarApp = require('./app');
const config = require('./config/env');

const app = criarApp();

const server = app.listen(config.port, () => {
  console.log(`Focus STT rodando na porta ${config.port}`);
});

function shutdown(signal) {
  console.log(`\n${signal} recebido. Encerrando servidor...`);
  server.close(() => {
    const db = require('./config/database');
    db.close();
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = server;
