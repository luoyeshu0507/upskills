/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const MAX = 2147483647, MIN = -2147483648;
var divide = function(dividend, divisor) {
    if(dividend == MIN && divisor == -1)
        return MAX;
    let a = Math.abs(dividend), b = Math.abs(divisor), res = 0;
    for(let i=31;i>=0;i--){
        if((a>>>i)>=b){
            // 1<<31 = -2147483648，需特殊处理
            if(i==31){
                a -= MAX;
                a -= 1;
                res -= MIN;
            } else{
                a -= b<<i;
                res += 1<<i;
            }
        }
    }
    return (dividend > 0) == (divisor > 0) ? res : -res;
};

console.log(divide(-2147483648, 2));