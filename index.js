var config = require('./config/config');
var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));


app.get('/', function (req, res) {
	
	res.send('Hello I\'m Samantha!');
});

app.get('/fake', function (req, res) {

	res.render('fake.jade');
});

var server = app.listen(config.app.port, function () {

	console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {

	console.log('Client connected');

	socket.on('new-read', function () {

		console.log('new-read-server');
		io.sockets.emit('new-read-server', { message: 'new-read' });
	});

	socket.on('door-open', function () {

		console.log('door-open-server');
		io.sockets.emit('door-open-server', { message: 'door-open' });
	});

	socket.on('driver-fails', function () {

		console.log('driver-fails-server');
		io.sockets.emit('driver-fails-server', { message: 'driver-fails' });
	});

	socket.on('disconnect', function () {
    
    	console.log('Cleint disconnected');
  	});
});