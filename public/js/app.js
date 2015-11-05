// var moment = require('moment');


var socket = io();

socket.on('connect', function (){
	console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp); //.local().format('h:mm a');
	console.log('New message:');
	console.log(message.text);

	$('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>'); // have timestamp
});

//Handles submitting or new message

var $form = $('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	});

	$("#message-form input:text").val("");
	$message.val('');
});