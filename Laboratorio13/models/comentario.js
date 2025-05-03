const comentarios = [];

module.exports = class Comentario {
    constructor(texto) {
        this.texto = texto;
    }

    save() {
        comentarios.push(this);
    }

    static fetchAll() {
        return comentarios;
    }
}
