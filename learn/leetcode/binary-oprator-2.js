function sum(a, b) {
    let res = a ^ b;
    let plus = (a & b) << 1;
    while (plus !== 0) {
        const temp = res;
        res ^= plus;
        plus = (temp & plus) << 1;
    }
    return res;
}

function minus(a, b) {
    return sum(a, getNeg(b));
}

function getNeg(a) {
    return sum(~ a, 1);
}

function isNeg(a) {
    return a < 0 ? 1 : 0;
}

function mult(a, b) {
    const isNegA = isNeg(a);
    const isNegB = isNeg(b);
    a = isNegA ? getNeg(a) : a;
    b = isNegB ? getNeg(b) : b;
    let res = 0, index = 0;
    while (b !== 0) {
        if (b & 1) {
            res = sum(res, a << index);
        }
        b = b >> 1;
        index = sum(index, 1);
    }
    return isNegA ^ isNegB ? getNeg(res) : res;
}

function divide(a, b) {
    if (b === 0) throw('Cann\t divide 0!');
    const isNegA = isNeg(a);
    const isNegB = isNeg(b);
    a = isNegA ? getNeg(a) : a;
    b = isNegB ? getNeg(b) : b;
    let res = 0, index = 31;
    while (index >= 0) {
        
        if (a >> index >= b) {
            console.log(111, a, index);
            a = minus(a, b << index);
            res = res | (1 << index);
        }
        index = minus(index, 1);
    }
    return isNegA ^ isNegB ? getNeg(res) : res;
}
console.log(divide(-2147483648, -1));