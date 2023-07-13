function first(arr, start = 0, end = arr.length - 1) {
    if (start === end) return arr[start];
    return Math.max(arr[start] + second(arr, start + 1, end), arr[end] + second(arr, start, end - 1));
}

function second(arr, start, end) {
    if (start === end) return 0;
    return Math.min(first(arr, start + 1, end), first(arr, start, end - 1));
}

console.log(first([7, 0, 1, 2, 3, 4]));
