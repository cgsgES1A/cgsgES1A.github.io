const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let cookieParser = require('cookie-parser');

app.use(cookieParser());

let nickname = "";

io.on('connection', (socket) => {
    socket.on('nickname', (nick) => {
        nickname = nick;
        io.emit('nickname', nickname);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server2.html');
    res.cookie("nickname", nickname);
});

app.get('/getuser', (req, res) => {
    res.send(req.cookies);
});

server.listen(8000, (err) => {
    if (err)
        throw err;
    console.log('listening on *:8000');
});