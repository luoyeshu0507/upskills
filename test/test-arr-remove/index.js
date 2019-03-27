var arr = [1, 2, 3, 4, 4, 5, 6, 7, 8, 9];
for (var i = 0; i < arr.length; i++) {
    if(arr[i]%2 === 0) {
        arr.splice(i, 1);
        i--;
    }
}
console.log(arr);