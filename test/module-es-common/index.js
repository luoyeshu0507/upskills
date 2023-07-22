// main.js
var mod = require('./lib');

console.log(mod.counter, mod.counter2);  // 3
mod.incCounter();
console.log(mod.counter, mod.counter2); // 3