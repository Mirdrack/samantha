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

			try {
				
				request.post(config.endPoints.newRead, { form : data.read }, function (error, response, body) {

					if (!error && response.statusCode == 201) {

						io.sockets.emit('new-read-server', JSON.parse(body));
					}
					else
						io.sockets.emit('error-server', JSON.parse(body));
				});
			}
			catch(err) {

			    console.log(err.message);
			}

		});

		socket.on('alarm-triggered', function (data) {

			try {

				request.post(config.endPoints.newAlarm, { form : data.alarm }, function (error, response, body) {

					if (!error && response.statusCode == 201) {

						io.sockets.emit('alarm-triggered-server', JSON.parse(body));
					}
					else
						io.sockets.emit('error-server', JSON.parse(body));
				});
			}
			catch(err) {

			    console.log(err.message);
			}

		});

		socket.on('driver-fails', function (data) {

			try {
			    
				request.post(config.endPoints.newAlarm, { form : data.alarm }, function (error, response, body) {

					if (!error && response.statusCode == 201) {

						io.sockets.emit('driver-fails-server', JSON.parse(body));
					}
					else
						io.sockets.emit('error-server', JSON.parse(body));
				});
			}
			catch(err) {
			    
			    console.log(err.message);
			}
		});

		socket.on('turn-on', function (data) {

			try {

				request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

					if (!error && response.statusCode == 201) {

						io.sockets.emit('turn-on-server', JSON.parse(body));
					}
					else
					{
						io.sockets.emit('error-server', JSON.parse(body));
					}
				});
			}
			catch(err) {

			    console.log(err.message);
			}
			
		});

		socket.on('turn-off', function (data) {

			try {

				request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

					if (!error && response.statusCode == 201) {

						io.sockets.emit('turn-off-server', JSON.parse(body));
					}
					else
						io.sockets.emit('error-server', JSON.parse(body));
				});
			}
			catch(err) {
			    
			    console.log(err.message);
			}

		});

		socket.on('deactivate-alarm', function(data) {

			try {

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
			}
			catch(err) {
			    
			    console.log(err.message);
			}
		});

		socket.on('activate-alarm', function(data) {

			try {

				request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

					if (!error && response.statusCode == 201) {

						io.sockets.emit('activate-alarm-server', JSON.parse(body));
					}
					else
						io.sockets.emit('error-server', JSON.parse(body));
				});
			}
			catch(err) {

			    console.log(err.message);
			}
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


		try {

			request.post(config.endPoints.newEvent, { form : data.event }, function (error, response, body) {

				if (!error && response.statusCode == 201) {

					io.sockets.emit('activate-alarm-server', JSON.parse(body));
				}
				else
					io.sockets.emit('error-server', JSON.parse(body));
			});
		}
		catch(err) {
			
		    console.log(err.message);
		}

	}
};

module.exports = sockets;
