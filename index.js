var config = require('./config/config');
var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(function(req, res, next) {
	
	res.header('Access-Control-Allow-Origin', '*');
	return next();
});


var routes = require('./routes')(app);

var server = app.listen(config.app.port, function () {

	console.log('Listening on port %d', server.address().port);
});

var request = require('request');
var io = require('socket.io')(server);
var sockets = require('./sockets')(io, request, config);
