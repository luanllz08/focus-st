const Exclusao = (() => {
  let idAlvo = null;

  function bind() {
    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', () => iniciarExclusao(btn.dataset.id));
    });
  }

  function iniciarExclusao(id) {
    idAlvo = id;
    openModal('modalExclusao1');
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('oculto');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('oculto');
  }

  document.getElementById('modal1Cancelar')?.addEventListener('click', () => {
    closeModal('modalExclusao1');
    idAlvo = null;
  });

  document.getElementById('modal1Confirmar')?.addEventListener('click', () => {
    closeModal('modalExclusao1');
    const idEl = document.getElementById('modal2Id');
    if (idEl) idEl.textContent = '#' + idAlvo;
    const input = document.getElementById('modal2Input');
    if (input) input.value = '';
    const confirmar = document.getElementById('modal2Confirmar');
    if (confirmar) confirmar.disabled = true;
    const aviso = document.getElementById('modal2Aviso');
    if (aviso) aviso.textContent = '';
    openModal('modalExclusao2');
  });

  document.getElementById('modal2Cancelar')?.addEventListener('click', () => {
    closeModal('modalExclusao2');
    idAlvo = null;
  });

  document.getElementById('modal2Input')?.addEventListener('input', (e) => {
    const digitado = e.target.value.trim();
    const confirmar = document.getElementById('modal2Confirmar');
    const aviso = document.getElementById('modal2Aviso');
    if (digitado === String(idAlvo)) {
      if (confirmar) confirmar.disabled = false;
      if (aviso) aviso.textContent = '';
    } else if (digitado !== '') {
      if (confirmar) confirmar.disabled = true;
      if (aviso) aviso.textContent = 'Número não confere.';
    } else {
      if (confirmar) confirmar.disabled = true;
      if (aviso) aviso.textContent = '';
    }
  });

  document.getElementById('modal2Confirmar')?.addEventListener('click', async () => {
    const confirmar = document.getElementById('modal2Confirmar');
    confirmar.disabled = true;
    try {
      await API.delete(`/admin/atendimentos/${idAlvo}`);
      Toast.mostrar(`Atendimento #${idAlvo} excluído com sucesso.`, 'sucesso');
      closeModal('modalExclusao2');
      Dashboard.carregar();
    } catch (err) {
      Toast.mostrar(err.mensagem || 'Erro ao excluir.', 'erro');
      closeModal('modalExclusao2');
      Dashboard.carregar();
    } finally {
      confirmar.disabled = false;
      idAlvo = null;
    }
  });

  return { bind };
})();
