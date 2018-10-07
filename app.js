'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const favicon = require('serve-favicon')
const commandParser = require('./src/utils/commandParser/commandParser')

const cmdParser = new commandParser();

app.use('/public', express.static(process.env.PWD + '/public'));
app.use('/jquery', express.static(process.env.PWD + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(process.env.PWD + '/node_modules/bootstrap/dist/'));
app.use(favicon(path.join(process.env.PWD + '/public/assets/img/Eko-logo.ico')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.env.PWD + '/public/views/index.html'));
});

io.on('connection', client => {
    client.on('_cmd', data => {
        client.emit('cmd_', { message: cmdParser.parseCmd(data.message) });
    });
});

server.listen(8090);
