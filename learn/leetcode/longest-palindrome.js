/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    let arr = [];
    let len = s.length;
    if (len < 2) return len;
    const ss = '#' + s.split('').join('#') + '#';
    len = ss.length;
    let c = 0, R = 0, max = 1;
    for (let i = 0; i < len; i++) {
        arr[i] = i < R ? Math.min(arr[2 * c - i], R - i): 1;
        while (ss[i + arr[i]]  === ss[i - arr[i]] && i + arr[i] < len) {
            arr[i] ++;
        }
        if (i + arr[i] > R) {
            R = i + arr[i];
            c = i;
        }
        max = arr[i] > max ? arr[i] : max;
    }

    return max - 1;
};
longestPalindrome("aacabdkacaa");