
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();
var mainUser;

console.log(name + ' wants to join ' + room);

// Update h1 tag
$(".room-title").text(room);

socket.on('connect', function (){
	console.log('Connected to socket.io server!');

	socket.emit('joinRoom', {
		name: name,
		room: room
	})

});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp); //.local().format('h:mm a');
	var $messages = $('.messages');
	var $message = $('<li class="list-group-item"></li>')

	console.log('New message:');
	console.log(message.text);

	//$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	if (message.name === mainUser)
		$message.append('<p class=thisusername><strong>' + message.name + '</strong></p>');
	else
		$message.append('<p class=username><strong>' + message.name + '</strong></p>');


	$message.append('<p>' + message.text + '</p>');
	$message.append('<p class=time><strong>'+ momentTimestamp.local().format('h:mm a') +'</strong></p>');
	$messages.append($message);
});


socket.on('side', function (side) {
	var $sidebar = $('.sidebar');
	var peopleArray=side.people.split("\n");
	//console.log(peopleArray);
	peopleArray.forEach(function(user){
		//console.log(user);
		var $user = $('<li></li>');
		$user.append('<p class="list-group-item">' + user + '</p>');
		$sidebar.append($user);
	})
});

socket.on('getUser', function(test){
	$(".navbar-right").append(test.user);
	mainUser=test.user;
})


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