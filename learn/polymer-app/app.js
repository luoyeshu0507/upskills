const express = require('express')
const path = require('path')
const app = express()

function getLang(headers) {
  var accept = headers['accept-language'];
  var cookie = headers['cookie'];
  var match = cookie.match(/(^|\s)hublang=([^;]*)(;|$)/);
  if (match) return match[2];
  else return accept.substr(0, 2).toLowerCase();
}



// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))

app.use('/', function(req, res, next) {
  var lang = getLang(req.headers);
  console.log(lang);
  res.sendFile(path.join(__dirname, '/public/i18n-template', lang + '-index2.html'));
})

app.listen(8080, () => {
  console.log(`App listening at port 8080`)
})