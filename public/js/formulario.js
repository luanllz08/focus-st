(function () {
  const form = document.getElementById('formAtendimento');
  if (!form) return;

  const btnEnviar = document.getElementById('btnEnviar');

  function validarTodos() {
    let tudoValido = true;

    const campos = [
      { id: 'nome_completo', regras: { required: true, minLength: 3, maxLength: 150 } },
      { id: 'email', regras: { required: true, email: true } },
      { id: 'telefone', regras: { required: true, telefone: true } },
      { id: 'descricao', regras: { required: true, minLength: 10, maxLength: 2000 } },
    ];

    campos.forEach(c => {
      const input = document.getElementById(c.id);
      if (input) {
        const ok = Validacao.validarCampo(input, c.regras);
        if (!ok) tudoValido = false;
      }
    });

    const tipo = document.getElementById('tipo_atendimento');
    if (tipo) {
      const erroEl = document.getElementById('tipo_atendimento_erro');
      const selecionou = tipo.value !== '';
      if (!selecionou) {
        tipo.classList.add('invalido');
        tipo.classList.remove('valido');
        if (erroEl) erroEl.textContent = 'Selecione uma opção.';
        tudoValido = false;
      } else {
        tipo.classList.remove('invalido');
        tipo.classList.add('valido');
        if (erroEl) erroEl.textContent = '';
      }
    }

    return tudoValido;
  }

  const camposVinculados = ['nome_completo', 'email', 'telefone', 'descricao', 'tipo_atendimento'];
  camposVinculados.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => validarTodos());
      el.addEventListener('input', async () => {
        if (el.value && Sanitizacao.removerTags(el.value) !== el.value) {
          el.value = Sanitizacao.limparTexto(el.value);
        }
        validarTodos();
      });
    }
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const sanitize = (v) => Sanitizacao.limparTexto(v);

    const payload = {
      nome_completo: sanitize(document.getElementById('nome_completo').value),
      email: sanitize(document.getElementById('email').value),
      telefone: sanitize(document.getElementById('telefone').value),
      tipo_atendimento: document.getElementById('tipo_atendimento').value,
      descricao: sanitize(document.getElementById('descricao').value),
    };

    if (!validarTodos()) {
      Toast.mostrar('Corrija os campos destacados.', 'erro');
      return;
    }

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    try {
      const resposta = await api.post('/api/atendimentos', payload);
      Toast.mostrar('Atendimento criado com sucesso!', 'sucesso');
      form.reset();
      camposVinculados.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('valido', 'invalido');
      });
    } catch (erro) {
      if (erro.status === 400 && erro.detalhes && erro.detalhes.length) {
        erro.detalhes.forEach(d => Toast.mostrar(d.mensagem, 'erro'));
      } else {
        Toast.mostrar(erro.mensagem || 'Erro ao enviar. Tente novamente.', 'erro');
      }
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.textContent = 'Enviar Atendimento';
    }
  });
})();
