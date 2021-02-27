const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const server = express();
const rateLimit = require("express-rate-limit");
require('dotenv').config();
const images = require('./images');

server.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
    "Too many requests from this IP, please try again after 15 minutes"
});

server.use('*', limiter);


server.use(favicon(__dirname + '/favicon.ico'));

server.use('*', (req, res, next) => {
    if(req.headers.authorization !== process.env.ACCESS) {
        res.status(403).send('Not authorised').end()
    } else {
        next();
    }
});

server.get("/", (req, res) => {
    res.send(images);
});

const port = process.env.PORT || 2000;

server.listen(port, () => console.log('APP LISTENING ON PORT: ' + port))