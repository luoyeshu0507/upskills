function getNumsA2B(k, a, b) {
    let count = 0;
    // 计算出 n 位相加乘以 k 最大能表达的数字 比如 b是 27832 假设所有位数最大为 29999 超出这个数字就不算了 
    const max = getMax(b, k);
    console.time();
    // 从第一个能被 k 整除的数开始循环 每次加 k 判断这个数能否满足题意
    for (let start = a + k - a % k; start <= b; start = start + k) {
        if (isMatch(start, k)) {
            count ++;
            console.log(start);
        }
        if (start > max) break;
    }
    console.timeEnd();
    return count;
}

function getMax(num, k) {
    const strB = String(num);
    let max = strB[0] * strB[0];
    for (let i = 1; i < strB.length; i++) {
        max += 81;
    }
    return max * k;
}

function isMatch(n, k) {
    let sum = 0;
    const str = String(n);
    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i] * str[i]);
    }
    return sum * k === n;
}

console.log(getNumsA2B(51, 1, 1000000000000000000));
