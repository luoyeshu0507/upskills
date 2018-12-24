const Rx = require('rxjs/Rx')
let obj = {a: 1};

const source$ = new Rx.Observable(function(observer) {
    console.log('start')
    let number = 1;
    let t = setInterval(function() {
        number++;
        observer.next(obj)
        if (number > 3) clearInterval(t)
    }, 1000)
})
source$.subscribe({
    next: function(item) {
        console.log(item)
    }
})

setTimeout(function() {
    source$.subscribe({
        next: function(item) {
            console.log(item)
        }
    })
}, 4000)