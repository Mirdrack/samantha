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

var io = require('socket.io')(server);
var sockets = require('./sockets')(io);
