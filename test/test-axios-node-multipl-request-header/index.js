const express = require('express');
const Axios = require('axios');
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();
const app = express();
app.get('*', function (req, res) {
  res.send(req.get('xx') + '-' + req.get('yy') + '-' + req.get('zz'));
});

const port = 8002;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const http = Axios.create({
  baseURL: 'http://localhost:8002/',
  timeout: 30000,
  cancelToken: source.token,
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'yy': 123,
  },
  withCredentials: true,
});
http.defaults.headers['zz'] = '456';

http.interceptors.request.use(function(config) {
  config.headers['xx'] = Math.random();
  return config;
});

http.get('/1').then((res) => {
  console.log(res.data);
});
http.get('/2').then((res) => {
  console.log(res.data);
});
http.get('/3').then((res) => {
  console.log(res.data);
});