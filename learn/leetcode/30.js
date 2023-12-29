/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    var map = {};
    words.forEach(w => {
        map[w] = map[w] ? map[w] + 1 : 1;
    });
    var wordsLen = words.length;
    var sLen = s.length;
    var wordLen = words[0].length;
    var strLeng = wordLen * wordsLen;
    var res = [];
    for (var i = 0; i <= sLen - strLeng; i ++) {
        var pass = true;
        var m = Object.assign({}, map);
        var j = i;
        while (j < i + strLeng) {
            var word = s.substring(j, j + wordLen);
            var v = m[word];
            if (v > 0) {
                m[word] = v - 1;
                j += wordLen;
            } else {
                pass = false;
                break;
            }
        }
        if (pass) {
            res.push(i);
        }
        m = null;
    }
    return res;
};

var findSubstring2 = function(s, words) {
    const res = [];
    const m = words.length, n = words[0].length, ls = s.length;
    for (let i = 0; i < n; i++) {
        if (i + m * n > ls) {
            break;
        }
        const differ = new Map();
        for (let j = 0; j < m; j++) {
            const word = s.substring(i + j * n, i + (j + 1) * n);
            differ.set(word, (differ.get(word) || 0) + 1);
        }
        for (const word of words) {
            differ.set(word, (differ.get(word) || 0) - 1);
            if (differ.get(word) === 0) {
                differ.delete(word);
            }
        }
        for (let start = i; start < ls - m * n + 1; start += n) {
            if (start !== i) {
                let word = s.substring(start + (m - 1) * n, start + m * n);
                differ.set(word, (differ.get(word) || 0) + 1);
                if (differ.get(word) === 0) {
                    differ.delete(word);
                }
                word = s.substring(start - n, start);
                differ.set(word, (differ.get(word) || 0) - 1);
                if (differ.get(word) === 0) {
                    differ.delete(word);
                }
            }
            if (differ.size === 0) {
                res.push(start);
            }
        }
    }
    return res;
};

console.log(findSubstring2('barfoothefoobarman', ["foo","bar"]));