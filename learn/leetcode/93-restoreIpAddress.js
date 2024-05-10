function restoreIpAddress(s) {
  const res = []
  process(s, 0, [], res)
  return res
}

function process(s, start, pre, res) {
  const len = s.length - start
  const rest = 4 - pre.length
  if (rest === 0 && start === s.length) return res.push(pre.join('.'))
  if (
    start >= s.length ||
    len < rest ||
    len > rest * 3
  ) return
  pre.push(s[start])
  process(s, start + 1, pre, res)
  pre.pop()
  if (validate(s, start, start + 1)) {
    pre.push(s[start] + s[start + 1])
    process(s, start + 2, pre, res)
    pre.pop()
  }
  if (validate(s, start, start + 2)) {
    pre.push(s[start] + s[start + 1] + s[start + 2])
    process(s, start + 3, pre, res)
    pre.pop()
  }
}

function validate(s, start, end) {
  if (end < start || end >= s.length) return false
  const len = end - start + 1
  if (len === 2) return s[start] !== '0'
  if (len === 3) {
    const num = parseInt(s[start] + s[start + 1] + s[start + 2])
    return num > 99 && num <= 255
  }
  return true
}

console.log(restoreIpAddress('001010'))