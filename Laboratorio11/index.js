const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const rutasGenerales = require('./routes/general');
const rutasFormulario = require('./routes/formulario');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(rutasGenerales);
app.use(rutasFormulario);

app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
