const db = require('../util/database');

module.exports = class Videojuego {
    constructor(nombre, plataforma) {
        this.nombre = nombre;
        this.plataforma = plataforma;
    }

    async save() {
        let conn;
        try {
            conn = await db.getConnection();
            const result = await conn.query(
                'INSERT INTO videojuegos (nombre, plataforma) VALUES (?, ?)',
                [this.nombre, this.plataforma]
            );
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }

    static async fetchAll() {
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query('SELECT * FROM videojuegos');
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }

    static async findById(id) {
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query('SELECT * FROM videojuegos WHERE id = ?', [id]);
            return rows[0]; // suponiendo que solo hay uno
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }

    static async update(id, nombre, plataforma) {
        let conn;
        try {
            conn = await db.getConnection();
            const result = await conn.query(
                'UPDATE videojuegos SET nombre = ?, plataforma = ? WHERE id = ?',
                [nombre, plataforma, id]
            );
            return result;
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }
};

