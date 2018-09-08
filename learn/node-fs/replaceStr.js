var fs = require('fs');
var file = "./test.md";
readFile(file);

function writeFile(file, str){
    console.log(str.match(/\"https:\/\/at\.alicdn\.com[^"]+\"/))
    str = str.replace(/\"https:\/\/at\.alicdn\.com[^"]+\"/, '"../../../../../src/style/anticon/iconfont"')
    fs.writeFile(file, str, 'utf8', function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

function readFile(file){
    fs.readFile(file, 'utf8', function(err, data){
        if(err)
            console.log("读取文件fail " + err);
        else{
            // console.log(data);
            writeFile(file, data)
        }
    });
}
