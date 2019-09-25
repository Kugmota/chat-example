// $(document).ready(function () {

// 	const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

// 	//Chat stuff
// 	const chatWindow = $('#chat');
// 	const messagesList = $('#messagesList');
// 	const messageInput = $('#messageInput');
// 	const sendBtn = $('#sendBtn');
// 	const messageForm = $('#messageForm');
// 	//login stuff
// 	let username = '';
// 	const usernameInput = $('#usernameInput');
// 	const loginBtn = $('#loginBtn');
// 	const loginWindow = $('#login');
// 	 var feedback = $("#feedback")



// 	const messages = []; // { author, date, content, type }

// 	//Connect to socket.io - automatically tries to connect on same port app was served from
// 	var socket = io();
// 	messageForm.addClass('hidden');
// 	socket.on('message', function (message) {
// 		//Update type of message based on username
// 		if (message.type !== messageTypes.LOGIN) {
// 			if (message.author === username) {
// 				message.type = messageTypes.RIGHT;
// 			} else {
// 				message.type = messageTypes.LEFT;
// 			}
// 		}

// 		messages.push(message);
// 		displayMessages();

// 		//scroll to the bottom
// 		chatWindow.scrollTop() = chatWindow.height();
// 	});

// 	createMessageHTML = function (message) {
// 		if (message.type === messageTypes.LOGIN) {
// 			return `
// 			<p class="secondary-text text-center mb-2">${
// 				message.author
// 				} joined the chat...</p>
// 		`;
// 		}

// 		//I STOPPED RIGHT HERE
// 		return `
// 	<div class="messages ${
// 			message.type === messageTypes.LEFT ? 'you' : 'me'
// 			}">
// 		<div style="flex-direction: column;
// 		text-overflow: ellipsis;
// 		white-space: initial;
// 		word-wrap: break-word;
// 		overflow: hidden; padding: 20px;">
// 		<p style="font-weight: bold">${
// 			message.type === messageTypes.LEFT ? message.author : ''
// 			}</p>
//      		${message.content} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>
// 			 <p style="float: right">${message.date}</p>
//   		</div>
// 	</div>
// 	`;
// 	};

// 	displayMessages = function () {
// 		const messagesHTML = messages
// 			.map(message => createMessageHTML(message))
// 			.join('');
// 		messagesList.html(messagesHTML);
// 	};

// 	sendBtn.on("click", function (e) {
// 		e.preventDefault();
// 		if (!messageInput.val()) {
// 			console.log('Invalid input');
// 		}

// 		function formatAMPM(date) {
// 			var hours = date.getHours();
// 			var minutes = date.getMinutes();
// 			var ampm = hours >= 12 ? 'PM' : 'AM';
// 			var month = date.getMonth();
// 			var day = date.getDate();
// 			var year = date.getFullYear();
// 			hours = hours % 12;
// 			hours = hours ? hours : 12; // the hour '0' should be '12'
// 			minutes = minutes < 10 ? '0' + minutes : minutes;
// 			var strTime = hours + ':' + minutes + ' ' + ampm + '  ' + month + '/' + day + '/' + year;
// 			return strTime;
// 		}

// 		const message = {
// 			author: username,
// 			date: formatAMPM(new Date()),
// 			content: messageInput.val()
// 		};
// 		sendMessage(message);
// 		//clear input
// 		messageInput.val("");
// 	});

// 	// $('#messageInput').bind("keypress", function () {
// 	// 	// e.preventDefault();
// 	// 	socket.emit('typing');
// 	// })


// 	loginBtn.on("click", function (e) {
// 		e.preventDefault();

// 		socket.on('userExists', function(data) {
// 			$('#userOnline').html(data);
// 		 });

// 		if (!usernameInput.val()) {
// 			console.log('Must supply a username');
// 			return swal.fire({
// 				title: "Want to continue?",
// 				text: "Please put username to proceed!",
// 				type: "warning",
// 				showCancelButton: false,
// 				confirmButtonClass: "btn-success",
// 				confirmButtonText: "Continue",
// 				closeOnConfirm: false
// 			})

// 		}

// 	// }).then((result) => {
// 	// 	if (result.value) {
		

// 		// swal({
// 		// 	title: "Are you sure?",
// 		// 	text: "Your will not be able to recover this imaginary file!",
// 		// 	type: "warning",
// 		// 	showCancelButton: true,
// 		// 	confirmButtonClass: "btn-danger",
// 		// 	confirmButtonText: "Yes, delete it!",
// 		// 	closeOnConfirm: false
// 		//   },
// 		//   function(){
// 		// 	swal("Deleted!", "Your imaginary file has been deleted.", "success");
// 		//   });


// 		// type: 'error',
// 		// 		title: 'No username given!!! Please give username!!!',

// 		//set the username and create logged in message
// 		username = usernameInput.val();
// 		sendMessage({ author: username, type: messageTypes.LOGIN });



// 		loginWindow.addClass('hidden');
// 		chatWindow.removeClass('hidden');
// 		messageForm.removeClass('hidden');

// 		//ADDED NICKNAME
		


// 	// 	socket.emit('send-nickname', username);

// 	// 	socket.on('userExists', function(data) {
// 	// 		$('#userOnline').html(data);
// 	// 	});
// 	// })

// 	socket.emit('send-nickname', username);
// 		socket.emit("online", username);
// 		$("#mn").text(username);
// 		socket.on('userExists', function (data) {
// 			$('#userOnline').html(data);
// 		});
// 	})
	
// 	sendMessage = function (message) {
// 		socket.emit('message', message);
// 	};

// 	var userCount;
// 	socket.on('userCount', function (data) {
// 		console.log(data.userCount);
// 		userCount = data.userCount;
// 		$('#user').text(userCount);
// 	});

// 	var index = 0;
// 	socket.on('usersOnline', function (data) {
// 		console.log(data.usersOnline);
// 	})

// 	$('#messageInput').bind("keypress", function () {
// 		// e.preventDefault();
// 		socket.emit('typing');
// 	})

	


// 	socket.on('typing', function (message, err) {
// 		console.log(err);
// 		$('#h2').html(message.username+ " is typing a message...");
// 		setTimeout(function () {
// 		$("#h2").html('');
// 		}, 3000);
// 		})
// })




//  //Emit typing
//  message.bind("keypress", () => {
// 	 socket.emit('typing')
//  })

//  //Listen on typing
//  socket.on('typing', (data) => {
// 	 feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
//  })


//WHATS LACKING IS THAT YOU SHOULD FIX THE BUG FOR USERNAME EXISTS AND
//BREAK THE ONLINE USERS
//CREATE A USER HAS LEFT THE CHAT
//
$(document).ready(function () {

	const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

	//Chat stuff
	const chatWindow = $('#chat');
	const messagesList = $('#messagesList');
	const messageInput = $('#messageInput');
	const sendBtn = $('#sendBtn');
	const messageForm = $('#messageForm');
	//login stuff
	let username = '';
	const usernameInput = $('#usernameInput');
	const loginBtn = $('#loginBtn');
	const loginWindow = $('#login');
	var mylistusers = [];


	const messages = []; // { author, date, content, type }

	//Connect to socket.io - automatically tries to connect on same port app was served from
	var socket = io();
	messageForm.addClass('hidden');
	socket.on('message', function (message) {
		//Update type of message based on username
		if (message.type !== messageTypes.LOGIN) {
			if (message.author === username) {
				message.type = messageTypes.RIGHT;
			} else {
				message.type = messageTypes.LEFT;
			}
		}

		messages.push(message);
		displayMessages();

		chatWindow.scrollTop(chatWindow[0].scrollHeight);
	});

	createMessageHTML = function (message) {
		if (message.type === messageTypes.LOGIN) {
			return `
			<br><p class="secondary-text text-center mb-2" id="status">${
				message.author
				} joined the chat...</p>
		`;
		}
		else {

		}



		//I STOPPED RIGHT HERE
		return `
	<div class="messages ${
			message.type === messageTypes.LEFT ? 'you' : 'me'
			}">
		<div style="flex-direction: column;
		text-overflow: ellipsis;
		white-space: initial;
		word-wrap: break-word;
		overflow: hidden; padding: 20px;">
		<p style="font-weight: bold">${
			message.type === messageTypes.LEFT ? message.author : ''
			}</p>
     		${message.content} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>
			 <p style="float: right">${message.date}</p>
  		</div>
	</div>
	`;
	};
	socket.on('userSet', function(data){
		for(var i=0; i<data.length; ++i){
			if(!mylistusers.includes(data[i]) && data[i]!=usernameInput.val() ){
				mylistusers.push(data[i]);
				$("#userholder").append($("<p>").html(data[i]))
			}
		
		}
	})

	displayMessages = function () {
		const messagesHTML = messages
			.map(message => createMessageHTML(message))
			.join('');
		messagesList.html(messagesHTML);
	};

	sendBtn.on("click", function (e) {
		e.preventDefault();
		if (!messageInput.val()) {
			console.log('Invalid input');
			return;
		}

		function formatAMPM(date) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'PM' : 'AM';
			var month = date.getMonth();
			var day = date.getDate();
			var year = date.getFullYear();
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0' + minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm + '  ' + month + '/' + day + '/' + year;
			return strTime;
		}

		const message = {
			author: username,
			date: formatAMPM(new Date()),
			content: messageInput.val()
		};
		sendMessage(message);
		//clear input
		messageInput.val("");
	});


	loginBtn.on("click", function (e) {
		e.preventDefault();

		if (!usernameInput.val()) {
			console.log('Must supply a username');
			return Swal.fire({
				type: 'error',
				title: 'Please input username!',
			})
		}

		//set the username and create logged in message
		username = usernameInput.val();
		sendMessage({ author: username, type: messageTypes.LOGIN });
		//ADDED NICKNAME
		socket.emit('send-nickname', username);

		loginWindow.addClass('hidden');
		chatWindow.removeClass('hidden');
		messageForm.removeClass('hidden');
	})



	$('#logout').click(function(){
		alert(usernameInput.val())
		socket.emit('disconnect', usernameInput.val())
		window.location.replace("index.html");
	})

	socket.on('allUsers', function (listOfUsers) {
		$('#user').text(listOfUsers.length);
	});

	socket.on('allUsers', function (users) {
		$('#messages').html(users.join(", ").replace(/,/g,"<br>")).css("margin-left","5%");
	});

	sendMessage = function (message) {
		socket.emit('message', message);
	};

	$('#messageInput').bind("keypress", function () {
		socket.emit('typing');
	})

	socket.on('typing', function (message, err) {
		console.log(err);
		messagesList.append('<h6 id="isTyping" style="color: black; font-size: 20px;"></h6>');
		$('#isTyping').html(message.username + " is typing a message...");
		setTimeout(function () {
			$("#isTyping").html('');
		}, 3000);
	})


})