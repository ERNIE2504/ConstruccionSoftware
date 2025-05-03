const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentario_controller');

router.get('/nuevo-comentario', comentarioController.getFormulario);
router.post('/nuevo-comentario', comentarioController.postComentario);
router.get('/comentarios', comentarioController.getComentarios);

module.exports = router;
