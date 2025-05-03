const express = require('express');
const path = require('path');
const router = express.Router();

let nombres = [];

router.get('/', (req, res) => {
    res.render('form', { titulo: 'Formulario' });
});

router.post('/', (req, res) => {
    const nombre = req.body.nombre;
    nombres.push(nombre);

    res.render('gracias', {titulo: "Gracias", nombre: nombre, nombres: nombres });

});

router.get('/nombres', (req, res) => {
    res.render('gracias', {
        titulo: 'Lista de nombres',
        nombres: nombres,
        nombre: null
    });
});

module.exports = router;
