const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const rutasVideojuegos = require('./routes/videojuegos');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(rutasVideojuegos);

app.get('/', (req, res) => {
    res.send('Bienvenido a la app de videojuegos');
});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
