# Focus STT — Pacote de Diagramas UML (Gerados via PlantUML)

Este pacote contém os **13 diagramas UML** renderizados em PNG a partir do código-fonte PlantUML embutido nos três documentos de especificação.

## Estrutura do Pacote

```
diagramas_usuario/   → Diagramas do documento requisitos_de_usuario.md
diagramas_sistema/   → Diagramas do documento requisitos_de_sistema.md
diagramas_escopo/    → Diagramas do documento escopo_do_projeto.md
```

## Diagramas de Usuário (requisitos_de_usuario.md)

| Arquivo | Tipo de Diagrama | Seção no Documento |
|---------|------------------|--------------------|
| `casos_de_uso.png` | Diagrama de Casos de Uso (UML 2.5.1) | Seção 2.1 |
| `ds_formulario_publico.png` | Diagrama de Sequência — Formulário Público | Seção 5.1 |
| `ds_login.png` | Diagrama de Sequência — Login Admin | Seção 5.2 |
| `ds_alteracao_status.png` | Diagrama de Sequência — Alteração de Status | Seção 5.3 |
| `ds_exclusao_segura.png` | Diagrama de Sequência — Exclusão Segura (2 etapas) | Seção 5.4 |

## Diagramas de Sistema (requisitos_de_sistema.md)

| Arquivo | Tipo de Diagrama | Seção no Documento |
|---------|------------------|--------------------|
| `ds_backend_fluxo_completo.png` | Sequência — Rota → Middlewares → Controller → Service → Banco → Auditoria | Seção 3.1 |
| `ds_backend_criacao.png` | Sequência — Criação de Atendimento (Rota Pública) | Seção 3.2 |
| `ds_backend_auth.png` | Sequência — Autenticação e Verificação de JWT | Seção 3.3 |
| `classes_ocl.png` | Diagrama Estrutural de Classes + OCL | Seção 4.1 |

## Diagramas de Escopo (escopo_do_projeto.md)

| Arquivo | Tipo de Diagrama | Seção no Documento |
|---------|------------------|--------------------|
| `diagrama_contexto.png` | Diagrama de Contexto (System Boundary) | Seção 2.1 |
| `componentes_uml.png` | Diagrama de Componentes UML 2.5.1 | Seção 4.1 |
| `implantacao.png` | Diagrama de Implantação (Deployment) | Seção 5.1 |
| `controle_mudancas.png` | Diagrama de Atividades — Controle de Mudanças | Seção 9.1 |

## Ferramentas de Geração

- **PlantUML** 1.2024.7 (`plantuml-1.2024.7.jar`)
- **Java Runtime** — OpenJDK 11 (via ambiente conda `plantuml-env`)

## Regeneração dos Diagramas

Os diagramas podem ser regenerados a partir do código-fonte PlantUML embutido nos arquivos `.md`:

```bash
# Extrair blocos @startuml...@enduml de cada .md e renderizar com:
java -jar plantuml.jar -tpng -charset UTF-8 arquivo.puml
```

---

**Documentação relacionada (docs em Markdown):**
- [`requisitos_de_usuario.md`](../requisitos_de_usuario.md)
- [`requisitos_de_sistema.md`](../requisitos_de_sistema.md)
- [`escopo_do_projeto.md`](../escopo_do_projeto.md)