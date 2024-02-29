const http = require('http');
const Readable = require('stream').Readable;
const pipeline = require('stream/promises').pipeline;

const server = http.createServer((req, res) => {
    pipeline(
        Readable.from(`html header <img width="100" height="100" src="https://img1.baidu.com/it/u=4270144465,1604793144&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800" alt=""><br>`),
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Transfer-Encoding': 'chunked',
        }),
        {
            end: false,
        }
    ).then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                pipeline(Readable.from(`vue app ssr`), res, { end: false }).then(resolve);
            }, 5000);
        })
    }).then(() => {
        pipeline(Readable.from(`<br>footer`), res, { end: true })
    })
});

const PORT = 3000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
// 思路就是 ssr 的 html 可以分成三段 header vue-app footer, header 跟 footer 其实是静态的，vue-app 是异步耗时生成的，可以先把 header 返回给浏览器处理，让浏览器先去加载 header 里面的 js/css 节约时间，把 index.html 的响应变成流式的，分段响应