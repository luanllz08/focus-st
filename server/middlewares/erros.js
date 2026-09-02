function tratarErros(err, req, res, next) {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ erro: 'Payload excede o tamanho máximo permitido.' });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON malformado.' });
  }

  if (err.name === 'SyntaxError' && err.status === 400) {
    return res.status(400).json({ erro: 'Requisição inválida.' });
  }

  const status = err.status || 500;
  const body = { erro: err.message || 'Erro interno do servidor.' };
  if (err.erros) body.erros = err.erros;

  if (status >= 500) {
    console.error(`[ERRO] ${err.message}`, err.stack);
  }

  res.status(status).json(body);
}

module.exports = { tratarErros };
