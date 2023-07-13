function zigZag(arr) {
    if (!arr || !arr.length || !arr[0].length) return;
    process(arr, 0, 0, 1, -1);
}
function process(arr, x, y, dx, dy) {
    const row = arr.length, col = arr[0].length;
    while (x < col && y < row && x >= 0 && y >= 0) {
        console.log(arr[y][x]);
        x += dx;
        y += dy;
    }
    x -= dx;
    y -= dy;
    if (x === col - 1 && y === row - 1) return;
    if (y === 0) {
        const isEnd = x === col - 1;
        process(arr, isEnd ? x : x + 1, isEnd ? y + 1 : y, - dx, - dy);
    } else {
        const isEnd = y === row - 1;
        process(arr, isEnd ? x + 1 : x, isEnd ? y : y + 1, - dx, - dy);
    }
}

zigZag([
    [1, 2, 3, 4],
])