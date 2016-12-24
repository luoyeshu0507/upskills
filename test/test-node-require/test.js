var a = require('./a.js');
console.log(a.a);
console.log(a.file);
a.a = 12;

var a2 = require('./a.js');
console.log(a2.a);
