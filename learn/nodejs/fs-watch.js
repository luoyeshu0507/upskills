var fs = require('fs');
var w = fs.watch('./test.text', (eventType, filename) => {
  if (filename)
    console.log(eventType, filename);
    // Prints: <Buffer ...>
});

console.log(w);

w.on('change', () => {
  console.log(1);
})