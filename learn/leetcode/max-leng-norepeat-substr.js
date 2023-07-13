function getMaxNorepeatSubstr(str) {
    const map = {};
    const len = str.length;
    let pre = 0; // 以上一个位置结尾的最大不重复序列长度是多少
    let max = 0;
    for (let i = 0; i < len; i++) {
        const char = str[i];
        const prePosition = map[char] === undefined ? - Infinity : map[char];
        const cur = Math.min(pre + 1, i - prePosition); // 以当前为结尾的最大不重复长度（上一个长度 + 1 和 当前字符距离上个同字符的距离 取小）
        max = Math.max(cur, max);
        pre = cur;
        map[char] = i;
    }
    return max;
}

console.log(getMaxNorepeatSubstr('abcdabda'));
