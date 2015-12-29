var config = require('./config/config');
var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

var routes = require('./routes')(app);

var server = app.listen(config.app.port, function () {

	console.log('Listening on port %d', server.address().port);
});

var request = require('request');
var io = require('socket.io')(server);
io.set('origins', config.origins);
var sockets = require('./sockets')(io, request, config);
