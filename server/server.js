'use strict';

//Load version
var appinfo = require('../package.json');
console.log(appinfo.name + " " + appinfo.version);

var path = require('path');
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let usercount = 0;

app.set('port', process.env.PORT || 3000);
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
