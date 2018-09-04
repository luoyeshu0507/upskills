let sh = require('shelljs');
let user = 'lzw';
let packageNam = '2018-09-04';
let nginxConf = `server {
    listen       80;
    server_name  ${user}.luoyeshu.com;

    location / {
        root   /home/luoyeshu/${packageNam};
        index  index.html index.htm;
    }
}`;
sh.exec(`echo "${nginxConf}" > ${user}.conf`);