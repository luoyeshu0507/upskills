/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    var dp = [0];
    var len = s.length, max = 0;
    for (var i = 1; i < len; i ++) {
        dp[i] = 0;
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = (dp[i - 2] || 0) + 2;
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] ? dp[i - dp[i - 1] - 2] : 0);
            }
            max = Math.max(dp[i], max);
        }
    }
    return max;
};

longestValidParentheses(')()())');