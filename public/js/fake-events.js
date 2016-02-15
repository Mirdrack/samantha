socketURL = 'http://' + window.location.hostname;
console.log(socketURL);
var socket = io(socketURL);
socket.on('connect', function(){});

socket.on('new-read-server', function (data) {

	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('alarm-triggered-server', function (data) {

	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('driver-fails-server', function (data) {

	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('deactivate-alarm-server', function (data) {

	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('activate-alarm-server', function (data) {

	$('#server-response').html('<h2>' + data.message + '</h2>');
});

socket.on('error-server', function (data) {

	$('#server-response').html('<h2>' + data.error + '</h2>');
});

socket.on('disconnect', function(){});