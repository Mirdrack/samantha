var sockets = function (io, request, config) {

	var clients = {};

	io.on('connection', function (socket) {

		if(socket.handshake.query.clientName != undefined) {

			socket.name = socket.handshake.query.clientName;
			clients[socket.name] = socket;
			updateClients();
			console.log(socket.name + ' has been connected');
		}


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

		socket.on('turn-on', function (data) {

			request.post(config.endPoints.turnOn, { form : data }, function (error, response, body) {

				if (!error && response.statusCode == 200) {

					io.sockets.emit('turn-on-server', JSON.parse(body));
				}
				else
				{
					console.log(body);
					io.sockets.emit('error-server', JSON.parse(body));
				}
			});
		});

		socket.on('turn-off', function (data) {

			request.post(config.endPoints.turnOff, { form : data }, function (error, response, body) {

				if (!error && response.statusCode == 200) {

					io.sockets.emit('turn-off-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('disconnect', function () {
		
			if(!socket.name) return;
			delete clients[socket.name];
			console.log(socket.name + 'has been disconnected.')
			updateClients();
	  	});
	});

	function updateClients() {

		io.sockets.emit('clients-update', Object.keys(clients));
	}
};

module.exports = sockets;
