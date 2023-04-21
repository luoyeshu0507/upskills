/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = function(s, p, pos1 = 0, pos2 = 0) {
    if (s === p) return true;
    var i = pos1, j = pos2, len1 = s.length, len2 = p.length;
    while (i < len1 && j < len2) {
        var s1 = s[i], s2 = p[j];
        if (s1 === s2 || (s2)) {
            i++;
            j++;
        } else {
            if (s2 === '.' && p[j + 1] !== '*') 
        }
    }
    return i === len2 && j === len2;
};