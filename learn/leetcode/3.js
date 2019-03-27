var lengthOfLongestSubstring = function(s) {
    var cacheObj = {};
    var maxLen = 0;
    var len = 0;
    var start = 0;
    for(var i = 0, length = s.length; i < length; i++) {
        var pre = cacheObj[s[i]];
        if (pre !== undefined) {
            maxLen = Math.max(maxLen, len);
            len = i - pre;
            for (var j = start; j <= pre; j++) {
                delete cacheObj[s[j]];
            }
            start = pre + 1;
        } else {
            len++;
        }
        cacheObj[s[i]] = i;
    }
    return Math.max(maxLen, len);
};

console.log(lengthOfLongestSubstring('abca'));