var socket = io('http://localhost:8000');
socket.on('connect', function(){});

socket.on('new-read-server', function (data) {

	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('door-open-server', function (data) {

	console.log('door-open-server');
	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('driver-fails-server', function (data) {

	console.log('driver-fails-server');
	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('disconnect', function(){});