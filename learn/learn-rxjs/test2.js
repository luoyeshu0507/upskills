const Rx = require('rxjs/Rx')

const data$ = Rx.Observable.of(1,2,3)

data$.map(x => {
    console.log(x+'xxx')
    return x*2
}).subscribe({
    next: function(item) {
        console.log(item)
    }
})

