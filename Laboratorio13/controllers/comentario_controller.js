const Comentario = require('../models/comentario');

exports.getFormulario = (req, res, next) => {
    res.render('formulario_comentario', { titulo: 'Nuevo comentario' });
};

exports.postComentario = (req, res, next) => {
    const nuevo = new Comentario(req.body.comentario);
    nuevo.save();
    res.redirect('/comentarios');
};

exports.getComentarios = (req, res, next) => {
    const comentarios = Comentario.fetchAll();
    res.render('lista_comentarios', {
        titulo: 'Comentarios',
        comentarios: comentarios
    });
};
