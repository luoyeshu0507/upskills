// lib.js
var counter = 3;
function incCounter() {
  console.log('pre', counter);
  counter++;
  console.log('after', counter);
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};