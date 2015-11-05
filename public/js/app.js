
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
console.log(name + ' wants to join ' + room);


var socket = io();

socket.on('connect', function (){
	console.log('Connected to socket.io server!');

});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp); //.local().format('h:mm a');
	var $message = $('.messages');

	console.log('New message:');
	console.log(message.text);
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
});

//Handles submitting or new message

var $form = $('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});