const express = require('express');
const app = express();
const port = 8888;
const test = require('./test');

app.use((req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  test();
})