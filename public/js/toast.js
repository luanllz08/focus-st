const Toast = (() => {
  const container = document.getElementById('toastContainer');

  const cores = {
    sucesso: { bg: 'rgba(34,197,94,0.95)', border: '#22c55e' },
    erro: { bg: 'rgba(220,38,38,0.95)', border: '#dc2626' },
    info: { bg: 'rgba(59,130,246,0.95)', border: '#3b82f6' },
  };

  function mostrar(mensagem, tipo = 'info') {
    const el = document.createElement('div');
    const c = cores[tipo] || cores.info;
    el.style.cssText = `
      background:${c.bg};border-left:4px solid ${c.border};
      color:#fff;padding:0.75rem 1.2rem;border-radius:6px;
      font-size:0.9rem;box-shadow:0 4px 12px rgba(0,0,0,0.3);
      animation:toastIn 0.3s ease;min-width:250px;
    `;
    el.textContent = mensagem;
    container.appendChild(el);

    setTimeout(() => {
      el.style.animation = 'toastOut 0.3s ease forwards';
      el.addEventListener('animationend', () => el.remove());
    }, 4000);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
    @keyframes toastOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(40px)}}
  `;
  document.head.appendChild(style);

  return { mostrar };
})();
