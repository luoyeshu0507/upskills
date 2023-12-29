function sum(str, l = 0, r = str.length - 1) {
    let arr = [];
    for (let i = l; i <= r; i ++) {
        let char = str[i];
        if (isNum(char)) {
            while (isNum(str[i + 1])) {
                char += arr[i + 1];
                i ++;
            }
            arr.push(char);
        } else if (char === '(') {
            let j = r;
            while (str[j] !== ')') {
                j --;
            }
            arr.push(sum(str, i + 1, j - 1));
            i = j;
        } else if (/[+*]/.test(char)) {
            arr.push(char);
        }
    }
    let copy = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] === '*') {
            copy.push(arr[i] * arr[i + 2]);
            i = i + 2;
        } else if (isNum(arr[i])) {
            copy.push(arr[i]);
        }
    }
    return copy.reduce((cur, pre) => {
        return Number(cur) + Number(pre);
    }, 0);
}

function isNum(arg) {
    return /\d+/.test(arg);
}

console.log(sum('1 + 2 + (3 + 4 * (5 + 7 * 8)) * 3'));