function plusOne(arr) {
  const len = arr.length
  let plus = 1
  let i = len - 1
  while (i >= 0 && plus === 1) {
    if (arr[i] !== 9) {
      plus = 0
      arr[i] = arr[i] + 1
    } else {
      arr[i] = 0
      i --
    }
  }
  if (plus === 1) arr.unshift(1)
  return arr
}

console.log(plusOne([9,9,9]))