const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

let Nicks = [];
let string = "";

const requestListener = function (req, res) {
    console.log(
        `Request: ${req.method}, ${req.url}`
    );
    console.log(
        `Request headers: ${JSON.stringify(req.headers)}`
    );

    let fileName;
    let contentType;

    if (req.url === "/") {
        fileName = "server.html";
        contentType = "text/html";
    }
    else if (req.url.endsWith(".css")) {
        fileName = req.url.substr(1);
        contentType = "text/css";
    } else {
        res.writeHead(500);
        res.end("Error, unsupported");
        return;
    }

    fs.readFile(`${__dirname}/${fileName}`)
        .then(contents => {
            res.setHeader("Content-Type", contentType);
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });

    if (req.method === 'POST') {
        var data = '';

        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            Nicks.push(data);
            res.end();
            return;
        });
    }
    /*
        if (req.method === 'GET') {
            Nicks.forEach(function (nick) {
                string += nick + ';';
            });
            res.writeHead(200);
            res.end(string);
        }
    */
    return;

};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});