$(document).ready(function () {

	$('#read').click(newRedEvent);
	$('#door').click(doorOpenEvent);
	$('#driver').click(driverFailEvent); 

});

function newRedEvent() {

	console.log('newRedEvent');
	var read = {
		station_id: 1,
		dynamic_level: createDecimalData(50, 250),
		voltage: createDecimalData(380, 440),
		current: createDecimalData(15, 30),
		power: createDecimalData(250, 300),
	};

	var data = {
		event_type: 'new-read',
		message: 'New read',
		read: read, 
	};

	socket.emit('new-read', data);
	return false;
}

function doorOpenEvent() {

	var event = {
		station_id: 1,
		alarm_id: 1,
	};

	var data = {
		event_type: 'door-open',
		message: 'The door is open',
		event: event,
	};

	socket.emit('door-open', data);
	return false;
}

function driverFailEvent() {

	var event = {
		station_id: 1,
		alarm_id: 2,
	};

	var data = {
		event_type: 'driver-fails',
		message: 'The driver is failing',
		event: event,
	};

    socket.emit('driver-fails', data);
    return false;
}

function createDecimalData(min, max) {

	return Number((min + Math.random() * (max - min + 1)).toFixed(2));
}