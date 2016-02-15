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

		socket.on('alarm-triggered', function (data) {

			request.post(config.endPoints.newAlarm, { form : data.alarm }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('alarm-triggered-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('driver-fails', function (data) {

			request.post(config.endPoints.newAlarm, { form : data.alarm }, function (error, response, body) {

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

		socket.on('deactivate-alarm', function(data) {

			request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('deactivate-alarm-server', JSON.parse(body));
					setTimeout(function () {

						reactivateAlarm(data.event);
					}, config.reactivateAlarm);
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('activate-alarm', function(data) {

			request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('activate-alarm-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		});

		socket.on('disconnect', function () {
		
			if(!socket.name) return;
			delete clients[socket.name];
			console.log(socket.name + ' has been disconnected.')
			updateClients();
	  	});
	});

	function updateClients() {

		io.sockets.emit('clients-update', Object.keys(clients));
	}

	function reactivateAlarm(pastEvent) {

		var event = {
			user_id: pastEvent.user_id,
			station_id: pastEvent.station_id,
			event_type_id: 3,
			ip_address: pastEvent.ip_address,
		};

		var data = {
			event_type: 'alarm-activated',
			message: 'Alarm has been reactivated',
			event: event,
		};

		request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

			if (!error && response.statusCode == 201) {

				io.sockets.emit('activate-alarm-server', JSON.parse(body));
			}
			else
				io.sockets.emit('error-server', JSON.parse(body));
		});
	}
};

module.exports = sockets;
