const Status = (() => {
  function bind() {
    document.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', async () => {
        const id = select.dataset.id;
        const novoStatus = select.value;
        select.disabled = true;

        try {
          const data = await API.patch(`/admin/atendimentos/${id}/status`, { status: novoStatus });
          Toast.mostrar(`Status alterado de ${data.status_anterior} para ${data.status_novo}.`, 'sucesso');
        } catch (err) {
          Toast.mostrar(err.mensagem || 'Erro ao alterar status.', 'erro');
          Dashboard.carregar();
        } finally {
          select.disabled = false;
        }
      });
    });
  }

  return { bind };
})();
