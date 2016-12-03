'use strict';
let express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/hello', function (req, res) {
  res.send('Hello World 2!')
});

app.get('/test.js', function (req, res) {
  res.send('Hello World 3!')
});

app.use('/js', express.static('js'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
