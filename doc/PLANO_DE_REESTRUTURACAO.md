# Plano de Reestruturação — Sistema de Gestão de Atendimentos Focus STT

**Data:** 02/09/2026  
**Autor:** Engenharia de Software Sênior  
**Status:** Aprovado  
**Normas:** OMG UML 2.5.1, ISO/IEC/IEEE 29148:2018, ISO/IEC 25010, PMBOK 7ª Edição  
**Documentos-fonte:** `doc/requisitos_de_usuario.md`, `doc/requisitos_de_sistema.md`, `doc/escopo_do_projeto.md`

---

## 1. Contexto e Justificativa

O diretório atual contém a **aplicação educacional "Focus"** (login, cadastro, interface, salas, quiz, pesquisa, amigos, contas), que **não corresponde** ao sistema especificado na documentação recém-criada.

A documentação especifica um **Sistema de Gestão de Atendimentos** (formulário público de abertura + painel administrativo com alteração de status, exclusão segura e trilha de auditoria), conforme a stack: HTML5 Semântico, CSS3, JavaScript Vanilla/ES6+, Node.js, Express, SQLite/PostgreSQL.

**Decisão tomada (Sobrescrever):**
- A aplicação existente será movida para a pasta `/legado` (preservando seu histórico, sem apagá-la).
- Um **novo sistema de gestão de atendimentos** será criado do zero na raiz, conforme os MÓDULOS 01 a 04 do documento `escopo_do_projeto.md`.
- Toda a documentação será salva na pasta `/doc`.

---

## 2. Objetivos da Reestruturação

| ID | Objetivo | Origem |
|----|----------|--------|
| OBJ-01 | Estruturar o frontend em `public/` com HTML5 semântico, CSS3 responsivo e JS Vanilla/ES6+ | MÓDULO 01 |
| OBJ-02 | Estruturar o backend em `server/` com arquitetura em camadas (routes, middlewares, controllers, services, models) | MÓDULO 02 |
| OBJ-03 | Criar o esquema relacional (migrations/seeds) com Prepared Statements | MÓDULO 03 |
| OBJ-04 | Configurar `package.json` e `.env.example` | MÓDULO 04 |
| OBJ-05 | Consolidar toda a documentação e diagramas em `/doc` | Decisão de governança |
| OBJ-06 | Isolar a aplicação antiga em `/legado` | Preservção de histórico |

---

## 3. Estrutura de Diretórios Alvo

```
focus stt/
├── doc/                                    ← Documentação consolidada
│   ├── requisitos_de_usuario.md
│   ├── requisitos_de_sistema.md
│   ├── escopo_do_projeto.md
│   ├── README_DIAGRAMAS.md
│   ├── diagramas_usuario/
│   ├── diagramas_sistema/
│   ├── diagramas_escopo/
│   ├── diagramas_usuario.zip
│   ├── diagramas_sistema.zip
│   ├── diagramas_escopo.zip
│   └── focus_stt_diagramas_completos.zip
│
├── legado/                                 ← App educacional Focus antiga (movida, não apagada)
│   ├── index.html, cadastro.html, interface.html,
│   ├── sala.html, quiz.html, pesquisa.html,
│   ├── amigos.html, contas.html,
│   └── *_jpeg/png imagens
│
├── public/                                 ← MÓDULO 01 – Frontend
│   ├── index.html                          ← Formulário público de atendimento
│   ├── css/
│   │   ├── style.css
│   │   ├── admin.css
│   │   └── componentes.css
│   └── js/
│       ├── validacao.js
│       ├── sanitizacao.js
│       ├── formulario.js
│       ├── login.js
│       ├── dashboard.js
│       ├── status.js
│       ├── exclusao.js
│       ├── api.js
│       └── toast.js
│
├── server/                                 ← MÓDULO 02 – Backend
│   ├── server.js
│   ├── app.js
│   ├── config/
│   │   ├── env.js
│   │   └── database.js
│   ├── routes/
│   │   ├── rotasPublicas.js
│   │   ├── rotasAuth.js
│   │   └── rotasAdmin.js
│   ├── controllers/
│   │   ├── atendimentoController.js
│   │   └── authController.js
│   ├── services/
│   │   ├── atendimentoService.js
│   │   ├── authService.js
│   │   └── auditoriaService.js
│   ├── models/
│   │   ├── atendimentoModel.js
│   │   ├── usuarioModel.js
│   │   └── auditoriaModel.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── sanitizacao.js
│   │   ├── rateLimiter.js
│   │   └── erros.js
│   └── utils/
│       ├── validadores.js
│       ├── enums.js
│       └── seguranca.js
│
├── migrations/                             ← MÓDULO 03 – DDL
│   ├── 001_criar_tabelas.sql
│   └── rollback/
│       └── 001_rollback.sql
│
├── seeds/                                  ← MÓDULO 03 – Seed
│   └── 001_seed_admin.sql
│
├── package.json                            ← MÓDULO 04 – Dependências
├── .env.example                            ← MÓDULO 04 – Variáveis de ambiente
├── .gitignore
└── database/                               ← Banco SQLite (gerado em runtime)
```

---

## 4. Mapeamento Direta com os Requisitos de Sistema

| Entregável codificado | Arquivo a criar | Requisito-fonte (RSF/RSNF) |
|-----------------------|-----------------|----------------------------|
| Servidor HTTP Express | `server/server.js`, `server/app.js` | RSF-01 |
| Rota POST `/api/atendimentos` | `server/controllers/atendimentoController.js` | RSF-02 |
| Rota POST `/api/auth/login` | `server/controllers/authController.js` | RSF-03 |
| Rota GET listar | `server/controllers/atendimentoController.js` | RSF-04 |
| Rota GET detalhes | `server/controllers/atendimentoController.js` | RSF-05 |
| Rota PATCH status | `server/controllers/atendimentoController.js` | RSF-06 |
| Rota DELETE | `server/controllers/atendimentoController.js` | RSF-07 |
| Middleware JWT | `server/middlewares/auth.js` | RSF-08, RSNF-SEG-02/03 |
| Middleware sanitização | `server/middlewares/sanitizacao.js` | RSF-09, RSNF-SEG-04 |
| Middleware rate limit | `server/middlewares/rateLimiter.js` | RSF-10 |
| Criptografia bcrypt | `server/utils/seguranca.js` | RSNF-SEG-01 |
| SQL Prepared Statements | `server/models/*.js` | RSNF-SEG-05 |
| Headers de segurança | `server/app.js` (helmet) | RSNF-SEG-07 |
| Trilha de auditoria | `server/models/auditoriaModel.js` | RSNF-SEG-08 |
| DDL com constraints/índices | `migrations/001_criar_tabelas.sql` | Seção 5 (Dicionário) |
| Frontend HTML5 | `public/index.html` | RSNF-USA-01/03 |
| Validação client-side | `public/js/validacao.js` | RSNF-USA-01 |
| Sanitização DOMPurify | `public/js/sanitizacao.js` | RSNF-SEG-04 |
| Toast feedback | `public/js/toast.js` | RSNF-USA-02 |

---

## 5. Etapas da Reestruturação

### Etapa 1 — Isolar o legado
- Criar `/legado` e mover todos os arquivos da aplicação educacional Focus (`.html`, imagens), preservando a estrutura.
- **Não apagar** nada; apenas realocar.

### Etapa 2 — Consolidar documentação em `/doc`
- Criar pasta `/doc`.
- Mover `requisitos_de_usuario.md`, `requisitos_de_sistema.md`, `escopo_do_projeto.md`, `README_DIAGRAMAS.md`.
- Mover as pastas `diagramas_usuario/`, `diagramas_sistema/`, `diagramas_escopo/`.
- Mover as ZIPs `diagramas_usuario.zip`, `diagramas_sistema.zip`, `diagramas_escopo.zip`, `focus_stt_diagramas_completos.zip`.
- Remover a pasta vazia `documentação`.

### Etapa 3 — Criar estrutura de diretórios
- Criar `public/`, `server/`, `migrations/`, `seeds/` com a hierarquia do item 3.

### Etapa 4 — Implementar Backend (MÓDULO 02)
- `package.json`, `.env.example`, `server.js`, `app.js`, config, middlewares, controllers, services, models, utils.
- Aplicar todos os middlewares de segurança e as rotas REST.

### Etapa 5 — Implementar Frontend (MÓDULO 01)
- `public/index.html` (formulário), `public/admin/login.html`, `public/admin/dashboard.html`, CSS e JS.

### Etapa 6 — Migrations/Seeds (MÓDULO 03)
- `001_criar_tabelas.sql` e `001_seed_admin.sql`.

### Etapa 7 — Verificação
- `npm install`, atualização do banco, subida do servidor, smoke test das rotas.

---

## 6. Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Sobrescrever arquivos da app antiga | Isolar em `/legado` antes de qualquer criação nova |
| Conflito de nomes (index.html) | index.html novo criado em `/public`; o antigo vai para `/legado` |
| Erro de conexão com banco | Usar SQLite (sem server) por padrão em dev; pool configurável |
| Ambiguidade nos requisitos | Seguir estritamente `requisitos_de_sistema.md` e `escopo_do_projeto.md` |

---

**Fim do Plano de Reestruturação** — Este documento é o plano de governança da reorganização do sistema.