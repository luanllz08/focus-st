const Validacao = (() => {
  function emailValido(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  }

  function telefoneValido(telefone) {
    return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(telefone.trim());
  }

  function validarCampo(input, regras) {
    const valor = input.value.trim();
    let erro = '';

    if (regras.required && valor === '') {
      erro = regras.mensagemObrigatorio || 'Campo obrigatório.';
    } else if (valor !== '') {
      if (regras.minLength && valor.length < regras.minLength) {
        erro = `Mínimo de ${regras.minLength} caracteres.`;
      } else if (regras.maxLength && valor.length > regras.maxLength) {
        erro = `Máximo de ${regras.maxLength} caracteres.`;
      } else if (regras.email && !emailValido(valor)) {
        erro = 'Por favor, insira um e-mail válido.';
      } else if (regras.telefone && !telefoneValido(valor)) {
        erro = 'Formato (XX) XXXXX-XXXX.';
      }
    } else if (regras.select && valor === '') {
      erro = 'Selecione uma opção.';
    }

    const erroEl = document.getElementById(input.id + '_erro');
    if (erro) {
      input.classList.remove('valido');
      input.classList.add('invalido');
      if (erroEl) erroEl.textContent = erro;
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.classList.remove('invalido');
      input.classList.add('valido');
      if (erroEl) erroEl.textContent = '';
      input.removeAttribute('aria-invalid');
    }
    return !erro;
  }

  return { validarCampo, emailValido, telefoneValido };
})();
