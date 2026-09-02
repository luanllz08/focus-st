const Sanitizacao = (() => {
  function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }

  function removerTags(texto) {
    return String(texto).replace(/<[^>]*>/g, '');
  }

  function limparTexto(bruto) {
    if (typeof bruto !== 'string') return '';
    return removerTags(bruto).trim();
  }

  return { escaparHTML, removerTags, limparTexto };
})();
