console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')

// start end p3 t1 p1 t2 p2

function getMaxNoRepeatStrLen(str) {
  const len = str.length;
  if (len < 2) return len;
  let map = {};
  let l = 0, max = 0;
  for (let i = 0; i < len; i++) {
    let preIndex = map[str[i]];
    if (preIndex !== undefined) {
      l = Math.max(l, preIndex);
    } else {
      map[str[i]] = i;
    }
    max = Math.max(max, i - l);
  }
  return max;
}

console.log(getMaxNoRepeatStrLen('abcdabda'));