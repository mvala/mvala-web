'use strict';

//Load version
let appinfo = require('../package.json');
console.log(appinfo.name + " " + appinfo.version);

let path = require('path');
let url = require('url');
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http, { path: '/api/socket.io'});
let usercount = 0;

let proxyinfo = require('../proxy.conf.json');

app.set('port', url.parse(proxyinfo['/api']['target']).port);
app.use(express.static(path.join(__dirname, '')));

io.on('connection', function (socket) {
    console.log('User ' + socket.id + ' connected');
    usercount++;
    socket.emit("app.info", {
        version: appinfo.version,
        user_count: usercount
    })
    socket.broadcast.emit("app.info", {
        version: appinfo.version,
        user_count: usercount
    })

    socket.on('disconnect', function () {
        console.log('User ' + socket.id + ' disconnected');
        usercount--;
        socket.broadcast.emit("app.info", {
            version: appinfo.version,
            user_count: usercount
        })
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(app.get('port'), function () {
    console.log('HTTP server listening on port ' + app.get('port'));
});
