const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { titulo: 'Inicio' });
});

router.get('/about', (req, res) => {
    res.render('about', { titulo: 'Sobre nosotros' });
});

module.exports = router;
