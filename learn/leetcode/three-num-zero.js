// const readline = require('readline');
// const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
// });
// rl.on('line', function(data){
//    console.log(data);
// })
function getSumZero(arr) {
    const len = arr.length;
    if (len < 3) return [];
    arr.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < len - 2; i ++) {
        while (i > 0 && arr[i] === arr[i - 1] && i < len - 2) {
            i ++;
        }
        let l = i + 1, r = len - 1;
        while (l < r) {
            const sum = arr[i] + arr[l] + arr[r];
            if (sum === 0) {
                res.push([arr[i], arr[l], arr[r]]);
                while (arr[l + 1] === arr[l] && l < r) {
                    l ++;
                }
                l ++;
                while (arr[r - 1] === arr[r] && l < r) {
                    r --;
                }
                r --;
            } else if (sum > 0) {
                r --;
            } else {
                l ++;
            }
        }
    }
    console.log(res.join());
    return res;
}

getSumZero([-1 , 10, 20, -10, 0]);