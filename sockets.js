var sockets = function (io, request, config) {


	io.on('connection', function (socket) {

		socket.on('new-read', function (data) {

			request.post(config.endPoints.newRead, { form : data.read }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('new-read-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('door-open', function (data) {

			request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('door-open-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('driver-fails', function (data) {

			request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('driver-fails-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('disconnect', function () {
		
			console.log('Client disconnected');
	  	});
	});
};

module.exports = sockets;
