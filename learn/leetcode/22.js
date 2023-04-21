/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var res = [];
    function generate(l, r, cur, res) {
        if (l < 0 || r < 0 || r < l) return;
        if (l == 0 && r === 0) return res.push(cur);
        generate(l - 1, r, cur + '(', res);
        generate(l, r - 1, cur + ')', res);
    }
    generate(n, n, '', res);
    return res;
};

console.log(generateParenthesis(1));
console.log(generateParenthesis(2));
console.log(generateParenthesis(3));
console.log(generateParenthesis(4));