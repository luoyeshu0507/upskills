function findMaxSum0Subarr(arr) {
    if (!arr || !arr.length) return 0;
    const map = {};
    map[0] = 0;
    let sum = 0;
    let res = 0;
    for (let i = 0; i < arr.length; i ++) {
        sum += arr[i] === 1 ? 1 : -1;
        if (map[sum] !== undefined) {
            res = Math.max(i - map[sum] + 1, res);
        } else {
            map[sum] = i + 1;
        }
    }
    return res;
}
console.log(findMaxSum0Subarr([0,1,0,1,1]));