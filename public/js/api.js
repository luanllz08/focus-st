const API = (() => {
  const BASE = '/api';
  const TOKEN_KEY = 'focus_stt_token';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  async function request(method, url, body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = { method, headers };
    if (body !== null) config.body = JSON.stringify(body);

    const res = await fetch(`${BASE}${url}`, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw { status: res.status, mensagem: data.mensagem || 'Erro na requisição' };
    }
    return data;
  }

  const api = {
    post: (url, body) => request('POST', url, body),
    get: (url) => request('GET', url),
    patch: (url, body) => request('PATCH', url, body),
    delete: (url) => request('DELETE', url),
    getToken,
  };

  window.API = api;
  window.api = api;
  return api;
})();
