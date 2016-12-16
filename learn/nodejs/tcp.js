'use strict';
let net = require('net');

let server = net.createServer(function(socket) {
	socket.on('data', function(data) {
		socket.write('hello world');
	});

	socket.on('end', function() {
		console.log('connection end');
	});

	socket.write('Welcome to my first connection!');
});

server.listen(8000, function() {
	console.log('connection start');
});