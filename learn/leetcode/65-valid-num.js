/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    var len = s.length;
    var eIndex = len;
    for (var i = 0; i < len; i ++) {
        if (s[i] === 'e' || s[i] === 'E') {
            eIndex = i;
            break;
        }
    }
    if (eIndex === 0 || eIndex === len - 1) return false;
    return checkBeforeE(s, eIndex) && checkAfterE(s, eIndex);
};

function checkBeforeE(s, eIndex) {
    var len = s.length, i = 0;
    if (s[0] === '+' || s[0] === '-') i ++;
    if (i >= len) return false;
    var dot = false;
    var pass = true;
    while (i < eIndex) {
        var char = s[i];
        if (/\d/.test(char)) {
            i ++;
        } else if (char === '.' && !dot) {
            dot = true;
            i ++;
        } else {
            return false;
        }
    }
    return pass;
}

function checkAfterE(s, eIndex) {
    var pass = true;
    var len = s.length;
    if (eIndex >= len) return true;
    for (var i = eIndex + 1; i < len; i ++) {
        if (!((i === eIndex + 1 && (i === '-' || i === '+')) || (/\d/.test(s[i])))) {
            return false;
        }
    }
    return pass;
}



isNumber('005047e+6');