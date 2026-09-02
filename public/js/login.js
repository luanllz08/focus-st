(() => {
  const form = document.getElementById('loginForm');
  const errorDiv = document.getElementById('error');
  const btnSubmit = document.getElementById('btnSubmit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Entrando...';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const data = await API.post('/auth/login', { email, password });
      localStorage.setItem('focus_stt_token', data.token);
      localStorage.setItem('focus_stt_user', JSON.stringify(data.user));
      window.location.href = '/admin/dashboard';
    } catch (err) {
      errorDiv.textContent = err.mensagem || 'Credenciais inválidas.';
      errorDiv.style.display = 'block';
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Entrar';
    }
  });
})();
