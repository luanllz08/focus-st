const AuditoriaModel = require('../models/auditoriaModel');

const AuditoriaService = {
  registrar(dados) {
    return AuditoriaModel.registrar(dados);
  },

  listarPorAtendimento(idAtendimento) {
    return AuditoriaModel.listarPorAtendimento(idAtendimento);
  },
};

module.exports = AuditoriaService;
