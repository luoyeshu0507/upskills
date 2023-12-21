function tryTask(fn, retry) {
    console.log('retry times: ', retry);
    return fn().catch(function(e) {
        if (retry > 0) {
            return tryTask(fn, retry - 1);
        } else {
            throw e;
        }
    });
}

function fn () {
    return Math.random() > 0.5 ? Promise.reject('reject') : Promise.resolve('resolve');
}

tryTask(fn, 1).then(console.log, console.error);