const fs = require('fs')

const textToInsert = `
\n
module.exports = {
  ...module.exports,
  a: 2,
  e: 6
}
`

const filePath = './conf.js';

fs.appendFile(filePath, textToInsert, (err) => {
    if (err) {
        console.error('文件写入错误：', err)
        return
    }
    console.log('文本已成功添加到文件末尾。')
    const data = require(filePath)
    console.log(data)
})