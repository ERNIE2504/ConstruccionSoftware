const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/form', (req, res) => {
    res.send(`
    <h1>Formulario</h1>
    <form action="/form" method="POST">
      <input type="text" name="nombre" placeholder="Escribe tu nombre" required/>
      <button type="submit">Enviar</button>
    </form>
  `);
});

router.post('/form', (req, res) => {
    const nombre = req.body.nombre;
    fs.appendFile(path.join(__dirname, '../datos.txt'), nombre + '\n', (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).send('Error interno del servidor');
        }
        res.send(`<h1>¡Gracias ${nombre}!</h1><a href="/">Volver al inicio</a>`);
    });
});

module.exports = router;
