var buf = new Buffer(100);
console.log(buf[0]);
console.log(buf[1]);
console.log(buf[2]);
buf[3] = 1000;
console.log(buf[3]);
console.log(Buffer.poolSize);

var buf2 = new Buffer('hello world', 'UTF-8');
console.log(buf2);
console.log(buf2.toString('UTF-8', 8));

var fs = require('fs');
var rs = fs.createReadStream('server.js');
rs.on('data', function(chunk) {
	console.log(chunk.toString());
})