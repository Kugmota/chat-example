const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
var   port = process.env.PORT || 3000
var userCount = 0;
//Serve public directory
var users = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, +'public/index.html'));
});

io.on('connection', function(socket) {
	console.log('a user connected');

//ADDED NICKNAME
	socket.on('send-nickname', function(data) {
		socket.nickname = data;
		if (users.indexOf(data) > -1) {
			io.emit('userExists', data + ' username is taken! Try some other username.');
		  } else {
			users.push(data);
			io.emit('userSet', users);
		  }
	});

	
	console.log(users[0]);

	userCount++;
	io.sockets.emit('userCount', { userCount: userCount });
	socket.on('disconnect', function () {
		userCount--;
		io.sockets.emit('userCount', { userCount: userCount });
	});


	socket.on('typing',function(data){
		io.emit('typing',{username : socket.nickname});
	})

	socket.on('message', function(message){
		console.log('message: ' + message);
		io.emit('message', message);
	});
	socket.on('typing', function () {
		io.emit('typing', { username: socket.username })
		})
});

io.on('connection', function (socket) {

    socket.on('check-username', function (username) {
        if (users.length != 0) {
            users.forEach(user => {
                if (user.username == username) {
                    socket.emit('verify-username', "1")
                } else {
                    socket.emit('verify-username', "0")
                    users.push({ id: socket.id, username: username })
                }
            });
        } else {
            users.push({ id: socket.id, username: username })
            io.emit('verify-username', "0")

        }
    })

    socket.on('get-online', function () {
        socket.emit("online-users", users)
    })

    socket.on("disconnect", function (message) {
		var index = users.indexOf(message);
		users.splice(index, 1);
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].id == socket.id) {
        //         users.splice(i, 1)
        //         break;
        //     }
        // }
    })
})





http.listen(port, function(){
	console.log('listening on port 3000',port);
});
