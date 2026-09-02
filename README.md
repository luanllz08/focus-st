# Focus STT — Sistema de Gestão de Atendimentos

Sistema full-stack de gestão de atendimentos com **formulário público** de abertura de demanda e **painel administrativo** com alteração de status, exclusão segura e trilha de auditoria.

## Stack Tecnológica

- **Frontend:** HTML5 Semântico, CSS3, JavaScript Vanilla/ES6+
- **Backend:** Node.js, Express
- **Banco de Dados:** SQLite (`better-sqlite3`) com Prepared Statements
- **Segurança:** JWT, bcrypt, sanitização XSS, rate limiting, helmet, soft delete

## Estrutura do Projeto

```
focus stt/
├── public/                 → Frontend (HTML5, CSS3, JS)
│   ├── index.html          → Formulário público de atendimento
│   ├── admin/              → Login + Painel administrativo
│   ├── css/                → Estilos (style, admin, componentes)
│   └── js/                 → Scripts Vanilla/ES6+
├── server/                 → Backend Node.js/Express
│   ├── config/             → env.js, database.js
│   ├── routes/             → rotasPublicas, rotasAuth, rotasAdmin
│   ├── controllers/        → atendimentoController, authController
│   ├── services/           → lógica de negócio
│   ├── models/             → acesso a dados (Prepared Statements)
│   ├── middlewares/        → auth, sanitização, rate limit, erros
│   └── utils/              → enums, validadores, seguranca
├── migrations/             → DDL das tabelas (SQL)
├── seeds/                  → Seed do administrador
├── database/               → Banco SQLite (gerado em runtime)
├── doc/                    → Documentação completa
└── legado/                 → Aplicação antiga preservada
```

## Requisitos

- Node.js ≥ 18
- npm

## Configuração

```bash
# 1. Instalar dependências
npm install

# 2. Criar o arquivo .env a partir do exemplo
cp .env.example .env
# (edite o JWT_SECRET com um valor forte)

# 3. Criar as tabelas
npm run db:init

# 4. Criar o usuário administrador
npm run db:seed
# (ou: npm run db:setup = init + seed)
```

## Execução

```bash
npm start          # inicia o servidor na porta 3000
npm run dev        # modo desenvolvimento (com watch)
```

## Acesso

- **Formulário público:** http://localhost:3000/ (qualquer visitante)
- **Login admin:** http://localhost:3000/admin/login
- **Dashboard admin:** http://localhost:3000/admin/dashboard

**Credenciais padrão do administrador (altere em produção!):**
- E-mail: `admin@focussstt.com`
- Senha: `admin123456`

## API REST

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/health` | Health check | Não |
| POST | `/api/atendimentos` | Cria atendimento | Não (limitada) |
| POST | `/api/auth/login` | Login → JWT | Não (limitada) |
| POST | `/api/auth/logout` | Logout | JWT |
| GET | `/api/auth/me` | Usuário autenticado | JWT |
| GET | `/api/admin/atendimentos` | Lista (paginada) | JWT (admin) |
| GET | `/api/admin/atendimentos/:id` | Detalhes | JWT (admin) |
| PATCH | `/api/admin/atendimentos/:id/status` | Altera status | JWT (admin) |
| DELETE | `/api/admin/atendimentos/:id` | Exclui (soft delete) | JWT (admin) |

## Máquina de Estados (Status)

- `Pendente` → `Em Andamento` | `Cancelado`
- `Em Andamento` → `Concluido` | `Cancelado`
- `Concluido` e `Cancelado` são absorventes (não podem ser alterados)

## Segurança

- Senhas com hash **bcrypt** (custo 12)
- Autenticação **JWT** (`Authorization: Bearer <token>`)
- Sanitização de **XSS** (middleware + client-side)
- **SQL Injection** prevenido via Prepared Statements
- **Rate limiting** por IP
- **Soft delete** + trilha de auditoria (append-only)

## Documentação

Consulte a pasta [`doc/`](./doc/) com:
- `requisitos_de_usuario.md`
- `requisitos_de_sistema.md`
- `escopo_do_projeto.md`
- Diagramas UML (PNG) e ZIPs de diagramas
- `PLANO_DE_REESTRUTURACAO.md`
