socketURL = 'http://' + window.location.hostname;
var socket = io(socketURL, { query: 'clientName=Samantha Client' });

socket.on('connect', function(){

	console.log('Connected to Samantha...');
});

socket.on('clients-update', function (data) {
	
	displayClientList(data);
});

function displayClientList(data) {

	$('#client-list').html('');
	data.forEach(function (element) {

		listElement = $('<li>');
		listElement.html(element);
		$('#client-list').append(listElement);
	});
}

