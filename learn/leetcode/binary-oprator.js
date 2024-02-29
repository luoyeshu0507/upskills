const MAX_VAL = ~ 0 >>> 1;
const MIN_VAL = 1 << 31;

function binaryAdd(a, b) {
    const res = pureBinaryAdd(a, b);

    // 溢出处理 如果两个数符号相同 相加后符号变了 则说明溢出了 返回对应符号的最大值
    const isNegA = isNegtive(a);
    const isNegB = isNegtive(b);
    const isNegRes = isNegtive(res);
    if (isNegA === isNegB && isNegA ^ isNegRes) return isNegA ? MIN_VAL : MAX_VAL;

    return res;
}


// 无边界条件判断的相加
function pureBinaryAdd(a, b) {
    var s1 = a ^ b;
    var s2 = (a & b) << 1;
    return s2 === 0 ? s1 : pureBinaryAdd(s1, s2);
}

function binaryMinus(a, b) {
    return binaryAdd(a, negtive(b));
}

function binaryMult(a, b) {
    var sum = 0;
    var isNegA = isNegtive(a);
    var isNegB = isNegtive(b);
    a = isNegA ? negtive(a) : a;
    b = isNegB ? negtive(b) : b;
    while (b !== 0) {
        if (b & 1 !== 0) {
            sum = binaryAdd(sum, a);
        }
        a <<= 1;
        b >>>= 1;
    }
    return isNegA ^ isNegB ? negtive(sum) : sum;
}

function binaryDiv(a, b) {
    if (b === 0) return NaN;
    var isNegA = isNegtive(a);
    var isNegB = isNegtive(b);
    a = isNegA ? negtive(a) : a;
    b = isNegB ? negtive(b) : b;
    var res = 0;
    for(var i = 31; i > -1; i = binaryMinus(i, 1)) {
        // 防止 b 溢出 不采用 b 右移判断大小，让 a 左移判断
        if ((a >> i) >= b) {
            res |= (1 << i);
            a = binaryMinus(a, b << i);
        }
    }
    return isNegA ^ isNegB ? negtive(res): res;
}

function isNegtive(a) {
    return a < 0 ? 1 : 0;
}

function negtive(a) {
    return binaryAdd(~ a, 1);
}

// 判断两个数字相加是否越界 如果越界返回最大(小)值 没越界返回 0
function getLimit(a, b) {
    // 判断是否符号一样 符号一样 相加后才可能越界
    const isNegA = isNegtive(a);
    const isNegB = isNegtive(b);
    const limit = isNegA ? MIN_VAL : MAX_VAL;
    if (isNegA !== isNegB) return 0;
    // 符号位后面一位 
    // 如果都是1 则相加必越界
    // 如果都是0 则必不越界
    // 如果0 1 各一个 则不好说要判断
    const firstBinaryA = a >> 30 & 1;
    const firstBinaryB = b >> 30 & 1;
    if (firstBinaryA === 1 && firstBinaryB === 1) {
        return limit;
    } else if (firstBinaryA !== 1 && firstBinaryB !== 1) {
        return 0;
    } else {
        return getLimit(a << 1, b << 1);
    }
}

function checkAdd(a, b, answer) {
    const res = binaryAdd(a, b);
    if (res === answer) {
        console.log(`[success]: ${a} + ${b} is ${answer}`);
    } else {
        console.error(`[error]: ${a} + ${b} is ${res}, not ${answer}`)
    }
}

checkAdd(1, 1 , 2);
checkAdd(-1, -1 , -2);
checkAdd(MAX_VAL, 1 , MAX_VAL);
checkAdd(MAX_VAL, MAX_VAL , MAX_VAL);
checkAdd(MAX_VAL, MIN_VAL , -1);
checkAdd(MIN_VAL,  MIN_VAL, MIN_VAL);
checkAdd(MIN_VAL, -1 , MIN_VAL);
checkAdd(MIN_VAL, 10 , MIN_VAL + 10);
checkAdd(MAX_VAL, - 10 , MAX_VAL - 10);
