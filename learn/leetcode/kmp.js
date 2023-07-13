function kmp(str1, str2) {
    const l1 = str1.length, l2 = str2.length;
    if (l2 > l1) return -1;
    if (str1 === str2) return 0;
    const next = calcNext(str2);
    let i = 0, j = 0;
    while (i < l1 && j < l2) {
        if (str1[i] === str2[j]) {
            i++;
            j++;
        } else if (next[j] !== -1) {
            j = next[j];
        } else {
            i++;
        }
    }
    return j === l2 ? i - j : -1;
}

function calcNext(str) {
    let next = [-1, 0];
    const l = str.length;
    let n = 0, i = 2;
    while (i < l) {
        if (str[n] === str[i - 1]) {
            next[i ++] = ++ n;
        } else if (n !== 0) {
            n = next[n];
        } else {
            next[i ++] = 0;
        }
    }
    return next;
}