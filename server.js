const express = require('express');
const cors = require('cors');
const images = require('./images.json');
const server = express();

server.use(cors())

server.use('*', (req, res, next) => {
    if(req.headers.authorization !== 'mysecrettoken') {
        res.status(403).send('Not authorised')
    }
    next();
});

server.get("/", (req, res) => {
    res.send(images);
});

const port = 2000;

server.listen(port, () => console.log('APP LISTENING ON PORT: ' + port))