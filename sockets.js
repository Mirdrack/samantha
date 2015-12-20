var sockets = function (io) {

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
		
			console.log('Client disconnected');
	  	});
	});
};

module.exports = sockets;