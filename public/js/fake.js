$(document).ready(function () {

	$('#read').click(function () {

		console.log('Event new read inserted');
	    socket.emit('new-read', 'New read.');
	    return false;
	});

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