/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    return process(s, p, 0, 0);
};

function process(s, p, i, j) {
    console.log(11, i, j);
    var lens = s.length;
    var lenp = p.length;
    if (i === lens && j === lenp) {
        return true;
    }
    while (i <= lens && j <= lenp) {
        console.log(22, i, j);
        var vs = s[i];
        var vp = p[j];
        var vpnext = p[j + 1];
        if (vs !== vp) {
            if (vp !== '.') {
                if (vpnext === '.') {
                    i ++;
                    j ++;
                } else if (vpnext === '*') {
                    return process(s, p, i, j + 2);
                } else {
                    return false;
                }
            } else {
                if (vpnext === '*') {
                    while (i <= lens) {
                        if (process(s, p, i, j + 2)) return true;
                        i ++;
                    }
                } else {
                    i ++;
                    j ++;
                }
            }         
        } else {
            if (vpnext !== '*') {
                i ++;
                j ++;
            } else {
                if (process(s, p, i, j + 2)) return true;
                while (vs === vp) {
                    i ++;
                    if (process(s, p, i, j + 2)) {
                        return true;
                    }
                    vs = s[i];
                }
                return false;
            }
        }
    }
    var vpnext = p[j + 1];
    while (vpnext === '*') {
        j += 2;
        vpnext = p[j + 1];
    } 
    return i === lens && j === lenp ? true : false;
}

console.log(isMatch('ac', 'aa*c*a*'));

// "bcbabcaacacbcabac"
// "a*c*a*b*.*aa*c*a*a*"
