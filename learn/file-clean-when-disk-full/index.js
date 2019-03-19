var fs = require('fs');

setInterval(function() {
  var time = +new Date();
  fs.writeFile('files/' + time + '.txt', time, 'utf8', function (){
    console.log('file writen!')
  });
}, 5000)