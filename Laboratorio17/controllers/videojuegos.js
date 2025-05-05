const Videojuego = require('../models/videojuego');

exports.getVideojuegos = async (req, res, next) => {
    try {
        const videojuegos = await Videojuego.fetchAll();
        res.render('vista', {
            videojuegos: videojuegos
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los videojuegos.");
    }
};

exports.getVideojuego = async (req, res, next) => {
    const id = req.params.videojuego_id;
    try {
        const videojuego = await Videojuego.findById(id);
        if (videojuego) {
            res.json(videojuego);
        } else {
            res.status(404).send("Videojuego no encontrado.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener el videojuego.");
    }
};

exports.insertarVideojuego = async (req, res, next) => {
    const { nombre, plataforma } = req.body;
    const videojuego = new Videojuego(nombre, plataforma);
    try {
        await videojuego.save();
        res.redirect('/videojuegos');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al insertar el videojuego.");
    }
};

exports.editarVideojuego = async (req, res, next) => {
    const { id, nombre, plataforma } = req.body;
    try {
        await Videojuego.update(id, nombre, plataforma);
        res.redirect('/videojuegos');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el videojuego.");
    }
};
exports.mostrarFormularioEditar = async (req, res) => {
    const id = req.params.videojuego_id;
    try {
        const videojuego = await Videojuego.findById(id);
        if (!videojuego) {
            return res.status(404).send("Videojuego no encontrado.");
        }
        res.render('editar-videojuego', { videojuego });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar el formulario de edición.");
    }
};

