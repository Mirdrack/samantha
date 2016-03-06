$(document).ready(function () {

	$('#read').click(newRedEvent);
	$('#alarm-on').click(activateAlarm); 
	$('#alarm-off').click(deactivateAlarm); 
	$('#alarm-triggered').click(alarmTriggered); 
	$('#station-on').click(stationOn); 
	$('#station-off').click(stationOff); 

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

function alarmTriggered() {
	
	var alarm = {
		station_id: 1,
		alarm_type_id: 1,
	};

	var data = {
		alarm_type: 'alarm-triggered',
		message: 'Alarm has been activated',
		alarm: alarm,
	};	

	socket.emit('alarm-triggered', data);
}

function activateAlarm() {

	var event = {
		user_id: 1,
		station_id: 1,
		event_type_id: 3,
		ip_address: '127.0.0.1',
	};

	var data = {
		event_type: 'alarm-activated',
		message: 'Alarm has been activated',
		event: event,
	};	

	socket.emit('activate-alarm', data);
}

function deactivateAlarm() {
	
	var event = {
		user_id: 1,
		station_id: 1,
		event_type_id: 4,
		ip_address: '127.0.0.1',
	};

	var data = {
		event_type: 'alarm-deactivated',
		message: 'Alarm has been activated',
		event: event,
	};	

	socket.emit('deactivate-alarm', data);
}

function stationOn() {

	var event = {
		user_id: 1,
		station_id: 1,
		event_type_id: 1,
		ip_address: '127.0.0.1',
	};

	var data = {
		event_type: 'station-on',
		message: 'The station has been turned on',
		event: event,
	};	

	socket.emit('turn-on', data);
}

function stationOff() {

	var event = {
		user_id: 1,
		station_id: 1,
		event_type_id: 2,
		ip_address: '127.0.0.1',
	};

	var data = {
		event_type: 'station-off',
		message: 'The station has been turned off',
		event: event,
	};	

	socket.emit('turn-off', data);
}

function createDecimalData(min, max) {

	return Number((min + Math.random() * (max - min + 1)).toFixed(2));
}