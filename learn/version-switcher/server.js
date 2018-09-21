var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = '/www/jenkins-dist';
var fs = require('fs');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', express.static(__dirname + '/'));

app.get('/api/folders', function(req, res, next) {
    fs.readdir(path, function(err, files) {
        if (err) {
            res.json({
                code: 500
            });
        } else {
            res.json({
                code: 200,
                files: files
            })
        }
    })
});

app.get('/api/getCurrentVersion', function(req, res, next) {
    var username = req.query.username;
    console.log(username);
    fs.readFile('/www/jenkins-nginx-conf/' + username + '.conf', 'utf8', function(err, data) {
        if (err) {
            res.json({
                code: 500
            });
        } else {
            res.json({
                code: 200,
                str: data
            })
        }
    })
});

app.post('/api/modifyNginxConf', function(req, res, next) {
    modifyFile(req.body.username, req.body.version);
});

function writeFile(file, str, name, v){
    console.log(str, '---', new RegExp(name + '\\d+'));
    str = str.replace(new RegExp(name + '-\\d+'), name + '-' + v);
    console.log(str);
    fs.writeFile(file, str, 'utf8', function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

function modifyFile(name, v){
    var file = './mock-conf/' + name + '.conf';
    fs.readFile(file, 'utf8', function(err, data){
        if(err)
            console.log("读取文件fail " + err);
        else{
            writeFile(file, data, name, v)
        }
    });
}

app.listen(3000, function() {
    console.log('Listening on port %d\n', 3000);
});