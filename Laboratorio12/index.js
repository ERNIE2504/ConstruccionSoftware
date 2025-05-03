const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const generalRoutes = require('./routes/general');
const formRoutes = require('./routes/formulario');



app.use(generalRoutes);
app.use('/form', formRoutes);

// Página 404
app.use((req, res) => {
    res.status(404).render('404', { titulo: 'Página no encontrada' });
});

app.listen(3000);
