// const readline = require('readline');
// const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
// });
// rl.on('line', function(data){
//    console.log(data);
// })
class Scheduler {
    constructor() {
        this.queue = [];
        this.count = 0;
        this.LIMIT = 2;
    }
    add(promiseCreator) {
        return new Promise((resolve) => {
            this.queue.push(resolve);
            this.run();
        }).then(() => {
            return promiseCreator().then(() => {
                this.count = this.count - 1;
                this.run();
            });
        });
    }
    run() {
        const { count, queue, LIMIT } = this;
        if (count < LIMIT && queue.length) {
            const task = queue.shift();
            this.count = count + 1;
            task();
        }
    }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')