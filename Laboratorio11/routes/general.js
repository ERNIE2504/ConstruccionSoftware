const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la página principal</h1><a href="/form">Ir al formulario</a>');
});

router.get('/about', (req, res) => {
    res.send('<h1>Sobre nosotros</h1><p>Esta es la página about.</p>');
});

router.get('/contacto', (req, res) => {
    res.send('<h1>Contacto</h1><p>Puedes escribirnos a contacto@example.com</p>');
});

router.get('/servicios', (req, res) => {
    res.send('<h1>Servicios</h1><p>Ofrecemos desarrollo web, asesoría técnica y más.</p>');
});


module.exports = router;
