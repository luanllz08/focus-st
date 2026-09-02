-- ============================================
-- Focus STT — Migration 001: Criação das Tabelas
-- Banco: SQLite
-- ============================================

CREATE TABLE IF NOT EXISTS atendimentos (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_completo   VARCHAR(150) NOT NULL
                    CHECK (length(nome_completo) >= 3 AND length(nome_completo) <= 150),
    email           VARCHAR(255) NOT NULL
                    CHECK (length(email) >= 5 AND length(email) <= 255 AND email LIKE '%_@_%'),
    telefone        VARCHAR(20) NOT NULL,
    tipo_atendimento VARCHAR(20) NOT NULL
                     CHECK (tipo_atendimento IN ('Duvida','Sugestao','Reclamacao','Solicitacao','Elogio')),
    descricao       TEXT NOT NULL
                    CHECK (length(descricao) >= 10 AND length(descricao) <= 2000),
    status          VARCHAR(20) NOT NULL DEFAULT 'Pendente'
                    CHECK (status IN ('Pendente','Em Andamento','Concluido','Cancelado')),
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at      DATETIME DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            VARCHAR(100) NOT NULL
                    CHECK (length(name) >= 2 AND length(name) <= 100),
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(10) NOT NULL DEFAULT 'admin'
                    CHECK (role IN ('admin','viewer')),
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at      DATETIME DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS trilha_auditoria (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    id_atendimento    INTEGER REFERENCES atendimentos(id) ON DELETE RESTRICT,
    id_usuario        INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    acao              VARCHAR(50) NOT NULL
                      CHECK (acao IN ('CRIACAO','ALTERACAO_STATUS','EXCLUSAO','LOGIN_SUCESSO','LOGIN_FALHA')),
    dados_anteriores  TEXT,
    dados_novos       TEXT,
    ip_origem         VARCHAR(45) NOT NULL DEFAULT '0.0.0.0',
    user_agent        VARCHAR(500) DEFAULT 'Desconhecido',
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_atendimentos_status ON atendimentos(status);
CREATE INDEX IF NOT EXISTS idx_atendimentos_tipo ON atendimentos(tipo_atendimento);
CREATE INDEX IF NOT EXISTS idx_atendimentos_created_at ON atendimentos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auditoria_atendimento ON trilha_auditoria(id_atendimento);
CREATE INDEX IF NOT EXISTS idx_auditoria_usuario ON trilha_auditoria(id_usuario) WHERE id_usuario IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_auditoria_acao ON trilha_auditoria(acao);
CREATE INDEX IF NOT EXISTS idx_auditoria_timestamp ON trilha_auditoria(created_at DESC);

-- Trilha de auditoria é append-only (proteção contra UPDATE)
CREATE TRIGGER IF NOT EXISTS trilha_auditoria_append_only_update
BEFORE UPDATE ON trilha_auditoria
BEGIN
    SELECT RAISE(ABORT, 'trilha_auditoria é append-only: UPDATE não permitido');
END;

CREATE TRIGGER IF NOT EXISTS trilha_auditoria_append_only_delete
BEFORE DELETE ON trilha_auditoria
BEGIN
    SELECT RAISE(ABORT, 'trilha_auditoria é append-only: DELETE não permitido');
END;
