-- ============================================
-- Focus STT — Migration 001: Rollback
-- Banco: SQLite
-- ============================================

DROP TRIGGER IF EXISTS trilha_auditoria_append_only_update;
DROP TRIGGER IF EXISTS trilha_auditoria_append_only_delete;

DROP TABLE IF EXISTS trilha_auditoria;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS atendimentos;
