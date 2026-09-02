const Dashboard = (() => {
  let paginaAtual = 1;
  const porPagina = 10;

  const MAPA_STATUS = {
    'Pendente': 'Pendente',
    'Em Andamento': 'Em Andamento',
    'Concluido': 'Concluído',
    'Cancelado': 'Cancelado',
  };

  const MAPA_TIPO = {
    'Duvida': 'Dúvida',
    'Sugestao': 'Sugestão',
    'Reclamacao': 'Reclamação',
    'Solicitacao': 'Solicitação',
    'Elogio': 'Elogio',
  };

  function init() {
    const token = API.getToken();
    if (!token) { window.location.href = '/admin/login'; return; }

    const userRaw = localStorage.getItem('focus_stt_user');
    if (userRaw) {
      const user = JSON.parse(userRaw);
      document.getElementById('usuarioInfo').textContent = `Olá, ${user.name}`;
    }

    document.getElementById('btnLogout').addEventListener('click', () => {
      localStorage.removeItem('focus_stt_token');
      localStorage.removeItem('focus_stt_user');
      window.location.href = '/admin/login';
    });

    document.getElementById('filterStatus').addEventListener('change', () => { paginaAtual = 1; carregar(); });
    document.getElementById('filterTipo').addEventListener('change', () => { paginaAtual = 1; carregar(); });

    carregar();
  }

  async function carregar() {
    const tbody = document.getElementById('tabelaAtendimentos');
    const emptyState = document.getElementById('emptyState');

    try {
      const params = new URLSearchParams();
      params.set('page', paginaAtual);
      params.set('limit', porPagina);

      const status = document.getElementById('filterStatus').value;
      const tipo = document.getElementById('filterTipo').value;
      if (status) params.set('status', status);
      if (tipo) params.set('tipo', tipo);

      const data = await API.get(`/admin/atendimentos?${params.toString()}`);
      const lista = data.data || [];
      const total = data.pagination ? data.pagination.total : lista.length;

      tbody.innerHTML = '';

      if (!lista.length) {
        emptyState.style.display = 'block';
        document.getElementById('paginacao').innerHTML = '';
        return;
      }
      emptyState.style.display = 'none';

      lista.forEach(item => {
        const tr = document.createElement('tr');
        tr.dataset.id = item.id;
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${escapeHtml(item.nome_completo)}</td>
          <td>${escapeHtml(MAPA_TIPO[item.tipo_atendimento] || item.tipo_atendimento)}</td>
          <td><span class="status-badge status-${item.status.replace(/ /g, '')}">${escapeHtml(MAPA_STATUS[item.status] || item.status)}</span></td>
          <td>${formatarData(item.created_at)}</td>
          <td>
            <div class="acoes">
              <select class="status-select" data-id="${item.id}" aria-label="Alterar status">
                ${gerarOptionsStatus(item.status)}
              </select>
              <button class="btn-acao btn-excluir" data-id="${item.id}" aria-label="Excluir">Excluir</button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });

      renderizarPaginacao(total);
      Status.bind();
      Exclusao.bind();
    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('focus_stt_token');
        window.location.href = '/admin/login';
        return;
      }
      Toast.mostrar(err.mensagem || 'Erro ao carregar atendimentos.', 'erro');
    }
  }

  function gerarOptionsStatus(statusAtual) {
    const opcoes = ['Pendente', 'Em Andamento', 'Concluido', 'Cancelado'];
    return opcoes
      .map(o => `<option value="${o}" ${o === statusAtual ? 'selected' : ''}>${MAPA_STATUS[o]}</option>`)
      .join('');
  }

  function renderizarPaginacao(total) {
    const div = document.getElementById('paginacao');
    const totalPaginas = Math.ceil(total / porPagina);
    if (totalPaginas <= 1) { div.innerHTML = ''; return; }

    let html = `<button id="pagAnterior" ${paginaAtual <= 1 ? 'disabled' : ''}>&laquo;</button>`;
    html += `<span>Página ${paginaAtual} de ${totalPaginas}</span>`;
    html += `<button id="pagProxima" ${paginaAtual >= totalPaginas ? 'disabled' : ''}>&raquo;</button>`;
    div.innerHTML = html;

    document.getElementById('pagAnterior')?.addEventListener('click', () => { paginaAtual--; carregar(); });
    document.getElementById('pagProxima')?.addEventListener('click', () => { paginaAtual++; carregar(); });
  }

  function formatarData(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  init();

  return { carregar };
})();
