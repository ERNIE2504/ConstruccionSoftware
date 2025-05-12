const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const controller = require("./index.controller");
app.post("/upload_file", controller.upload_file);
app.post("/upload_file_private", controller.upload_file_private);
app.get("/get_private_file/:file", controller.get_private_file);

const server = http.createServer( (request, response) => {
    console.log(request.url);
});

app.listen(3000);