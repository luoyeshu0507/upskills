var isMatch = function(s, p) {
    var sl = s.length, pl = p.length;
    var dp = [[true]];
    for (var i = 1; i <= pl; i ++) {
        if (p[i - 1] === '*' && (i === 1 || dp[i - 1][0] === true)) {
            dp[i] = [true];
        } else {
            dp[i] = [false];
        }
    }
    for (var i = 1; i <= pl; i ++) {
        for (var j = 1; j <= sl; j ++) {
            if (s[j - 1] === p[i - 1] || p[j - 1] === '?') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[i - 1] === '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            }
        }
    }
    return !!dp[pl][sl];
};
isMatch('aab', 'c*a*b');
