function binaryAdd(a, b) {
    var s1 = a ^ b;
    var s2 = (a & b) << 1;
    s2 = s2 & (~ (1 << 31));
    return s2 === 0 ? s1 : binaryAdd(s1, s2);
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
