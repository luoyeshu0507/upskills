const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Transfer-Encoding': 'chunked',
    })
    res.write('html header <img width="100" height="100" src="https://img1.baidu.com/it/u=4270144465,1604793144&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800" alt=""><br>')
    setTimeout(() => {
        res.write('vue app ssr');
        res.end('<br>footer');
    }, 10000)
});

const PORT = 3000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});