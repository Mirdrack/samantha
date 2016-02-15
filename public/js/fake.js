$(document).ready(function () {

	$('#read').click(newRedEvent);
	$('#driver').click(driverFailEvent); 
	$('#alarm-on').click(activateAlarm); 
	$('#alarm-off').click(deactivateAlarm); 
	$('#alarm-triggered').click(alarmTriggered); 

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

function driverFailEvent() {

	var alarm = {
		station_id: 1,
		alarm_type_id: 2,
	};

	var data = {
		alarm_type: 'driver-fails',
		message: 'The driver is failing',
		alarm: alarm,
	};

    socket.emit('driver-fails', data);
    return false;
}

function activateAlarm() {

	var event = {
		station_id: 1,
		alarm_id: 3,
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
		station_id: 1,
		alarm_id: 4,
	};

	var data = {
		event_type: 'alarm-activated',
		message: 'Alarm has been activated',
		event: event,
	};	

	socket.emit('deactivate-alarm', data);
}

function createDecimalData(min, max) {

	return Number((min + Math.random() * (max - min + 1)).toFixed(2));
}