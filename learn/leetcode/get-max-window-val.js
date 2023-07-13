function getMaxWindowValue(arr, k) {
    const len = arr.length;
    let l = 0, r = 0;
    let res = [];
    let queue = [];
    while (r < len) {
        while (r - l + 1 <= k && r < len) {
            while (queue.length && queue[queue.length - 1] < arr[r]) {
                queue.pop();
            }
            queue.push(arr[r ++]);
        }
        res.push(queue[0]);
        if (arr[l] === queue[0]) {
            queue.shift();
        }
        l ++;
    }
    return res;
}
console.log(getMaxWindowValue([4, 3, 5, 4, 3, 3, 6, 7], 3));
