function process(res, s = 1, n, k, pre = []) {
  if (k === 0) {
    return res.push([...pre])
  }
  if (s > n || n - s + 1 < k) return
  for (let i = s; i <= n; i ++) {
    pre.push(i)
    process(res, i + 1, n, k - 1, pre)
    pre.pop()
  }
}

function composition(n, k) {
  let res = []
  process(res, 1, n, k, [])
  console.log(res.toString())
}

composition(5, 2)