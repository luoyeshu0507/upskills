const cluster = require('cluster');
const http = require('http');
const cpuNumbs = require('os').cpus().length;
let flag = 0;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  for (let i = 0; i < cpuNumbs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`主进程 ${process.pid} 已退出`);
  });
  console.log(cluster.workers);
} else {
  http.createServer((req, res) => {
    console.log(`工作进程 ${process.pid} 被请求`);
    if (flag ++ >= 2) {
      throw 1;
    }
    res.writeHead(200);
    res.end('hello world');
  }).listen(8000);
  cluster.worker.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${process.pid} 已退出`);
  });
  console.log(`工作进程 ${process.pid} 已启动`);
}