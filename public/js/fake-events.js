var socket = io('http://localhost:8000');
socket.on('connect', function(){});

socket.on('new-read-server', function (data) {

	console.log('new-read-server');
	console.log(data);
});

socket.on('door-open-server', function (data) {

	console.log('door-open-server');
	console.log(data);
});

socket.on('driver-fails-server', function (data) {

	console.log('driver-fails-server');
	console.log(data);
});

socket.on('disconnect', function(){});