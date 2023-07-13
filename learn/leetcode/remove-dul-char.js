function getMinDirSortByDist(str) {
    if (!str) return '';
    const map = {};
    const len = str.length;
    for (let i = 0; i < len; i++) {
        map[str[i]] = map[str[i]] === undefined ? 1 : map[str[i]] + 1;
    }
    let minIndex = 0;
    for (let j = 0; j < len; j++) {
        if (map[str[j]] === 1) {
            return str[minIndex] + getMinDirSortByDist(str.substr(minIndex + 1).replace(new RegExp(str[minIndex], 'g'), ''));
        } else {
            map[str[j]] --;
            if (str[j] < str[minIndex]) minIndex = j;
        }
    }
}

console.log(getMinDirSortByDist('abcdda'));