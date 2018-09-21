var fs = require('fs');
var username = process.env.username;
var version = process.env.version;
console.log('username: ', username);
console.log('version: ', version);

function writeFile(file, str){
    str = str.replace(new RegExp(username + '-\\d+'), username + '-' + version);
    fs.writeFile(file, str, 'utf8', function(err){
        if(err) {
            console.log("fail " + err);
            throw err;
        } else {
            console.log("写入文件ok");
        }
    });
}

var file = '/www/jenkins-nginx-conf/' + username + '.conf';
fs.readFile(file, 'utf8', function(err, data){
    if(err)
        console.log("读取文件fail " + err);
        throw err;
    else{
        writeFile(file, data);
    }
});
