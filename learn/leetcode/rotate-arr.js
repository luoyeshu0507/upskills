function rotateOutputArr(arr) {
    dx(arr, 0, 0, arr[0].length, arr.length, 1);
}

function dx(arr, x, y, xMaxStep, yMaxStep, delt) {
    if (xMaxStep === 0) return;
    let step = xMaxStep;
    while (step !== 0) {
        console.log(arr[y][x]);
        x += delt;
        step --;
    }
    x -= delt;
    dy(arr, x, y + delt, xMaxStep, yMaxStep - 1, delt);
}

function dy(arr, x, y, xMaxStep, yMaxStep, delt) {
    if (yMaxStep === 0) return;
    let step = yMaxStep;
    while (step !== 0) {
        console.log(arr[y][x]);
        y += delt;
        step --;
    }
    y -= delt;
    dx(arr, x - delt, y, xMaxStep - 1, yMaxStep, - delt);
}
rotateOutputArr([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
]);