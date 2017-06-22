const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))

app.listen(8080, () => {
  console.log(`App listening at port 8080`)
})