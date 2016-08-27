'use strict';
let http = require('http');
let querystring = require('querystring');
http.createServer(function(req, res) {
	let postData = '';
	req.setEncoding('utf-8');
	req.on('data', function(chunk) {
		postData += chunk;
	});
	req.on('end', function() {
		res.end(postData);
	});
}).listen(3000);
console.log('node server started');