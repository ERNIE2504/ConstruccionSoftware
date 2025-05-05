const express = require('express');
const router = express.Router();
const videojuegosController = require('../controllers/videojuegos');

router.get('/videojuegos', videojuegosController.getVideojuegos);
router.get('/videojuegos/:videojuego_id', videojuegosController.getVideojuego);
router.get('/agregar-videojuego', (req, res) => {
    res.render('formulario-videojuego'); // Asegúrate de que este archivo exista en la carpeta 'views'
});
router.get('/editar-videojuego/:videojuego_id', videojuegosController.mostrarFormularioEditar);

router.get('/editar-videojuego/:videojuego_id', async (req, res) => {
    const id = req.params.videojuego_id;
    try {
        const videojuego = await videojuegosController.obtenerVideojuegoParaEditar(id);
        if (!videojuego) {
            return res.status(404).send("Videojuego no encontrado.");
        }
        res.render('editar-videojuego', { videojuego });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar el formulario de edición.");
    }
});


router.post('/agregar-videojuego', videojuegosController.insertarVideojuego);
router.post('/editar-videojuego', videojuegosController.editarVideojuego);

module.exports = router;
