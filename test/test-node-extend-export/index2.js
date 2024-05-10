const util = require('node:util')

const conf = {
  a: 1,
  b: 2,
  c: function(d) {
    console.log(d)
  },
  d: () => {
    console.error(111)
  },
  hello() {}
}

const confNew = {
  f: 'f'
}
for (let key in conf) {
  if (typeof conf[key] !== 'function') {
    confNew[key] = conf[key]
  } else {
    confNew[key] = `FUNCTION_START${conf[key].toString()}FUNCTION_END`
  }
}

console.log(confNew, util.inspect(confNew).replace(/\'FUNCTION_START(.*)FUNCTION_END\'/mg, '$1'))