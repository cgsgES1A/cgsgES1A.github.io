const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let cookieParser = require('cookie-parser');

app.use(cookieParser());

let nick = "";

app.get('/cookie', (req, res) => {
    if (req.method === 'POST') {
        var data = '';

        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            nick = data;
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server2.html');
    res.cookie("nickname", nick);
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', nick + msg);
    });
});

server.listen(8000, (err) => {
    if (err)
        throw err;
    console.log('listening on *:8000');
});