const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');

function getLang(headers) {
  var accept = headers['accept-language'];
  var cookie = headers['cookie'];
  var match = cookie.match(/(^|\s)hublang=([^;]*)(;|$)/);
  if (match) return match[2];
  else return accept.substr(0, 2).toLowerCase();
}

let fy = require('./public/baidu-fy/index.js');

// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/fy', function(req, res, next) {
  let json = JSON.parse(req.body.json);
  let result = {};
  let promise = [];
  for(let key in json) {
    promise.push(fy(json[key]).then(data => {
      result[key] = data.data.trans_result[0].dst;
    }, err => {
      result[key] = 'error';
    }));
  }
  Promise.all(promise).then(data => {
    res.send(JSON.stringify(result));
  }, err => {
    res.send('error');
  })
});

app.use('/', function(req, res, next) {
  // var lang = getLang(req.headers);
  // res.sendFile(path.join(__dirname, '/public/i18n-template', lang + '-index2.html'));
});

app.listen(8080, () => {
  console.log(`App listening at port 8080`)
})