const express = require('express');
const router = express.Router();
const AtendimentoController = require('../controllers/atendimentoController');
const { autenticar, autorizar } = require('../middlewares/auth');
const { RoleUsuario } = require('../utils/enums');

router.use(autenticar, autorizar(RoleUsuario.ADMIN));

router.get('/atendimentos', AtendimentoController.listarAtendimentos);
router.get('/atendimentos/:id', AtendimentoController.buscarPorId);
router.patch('/atendimentos/:id/status', AtendimentoController.alterarStatus);
router.delete('/atendimentos/:id', AtendimentoController.excluir);

module.exports = router;
