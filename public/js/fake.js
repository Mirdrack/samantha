$(document).ready(function () {

	$('#read').click(newRedEvent);

	$('#door').click(function () {

		console.log('Event door-open');
	    socket.emit('door-open', 'The door is open.');
	    return false;
	});

	$('#driver').click(function () {

		console.log('Event driver-fails');
	    socket.emit('driver-fails', 'The driver is failing.');
	    return false;
	});

}); 

function newRedEvent() {

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

function createDecimalData(min, max) {

	return Number((min + Math.random() * (max - min + 1)).toFixed(2));
}