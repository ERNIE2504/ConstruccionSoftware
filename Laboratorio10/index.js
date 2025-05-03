const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html');
        const content = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    } else if (req.url === '/guardar' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const datos = parse(body);
            const linea = `Nombre: ${datos.nombre}, Comentario: ${datos.comentario}\n`;
            fs.appendFileSync('datos.txt', linea);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Datos guardados exitosamente');
        });
    } else if (req.url === '/historial' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'historial.html');
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Archivo historial.html no encontrado');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
