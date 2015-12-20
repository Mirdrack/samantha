var sockets = function (io, request, config) {


	io.on('connection', function (socket) {

		console.log('Client connected');
		

		socket.on('new-read', function (data) {

			request.post(config.endPoints.newRead, { form : data.read }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('new-read-server', JSON.parse(body));
				}
			});
		});

		socket.on('door-open', function (data) {

			console.log('door-open-server');
			io.sockets.emit('door-open-server', { message: 'door-open' });
		});

		socket.on('driver-fails', function (data) {

			console.log('driver-fails-server');
			io.sockets.emit('driver-fails-server', { message: 'driver-fails' });
		});

		socket.on('disconnect', function () {
		
			console.log('Client disconnected');
	  	});
	});
};

module.exports = sockets;