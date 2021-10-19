const axiosMiddleware = require('../axios-middleware')('1234');
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 10000,
});

instance.interceptors.request.use(axiosMiddleware);

const getParams = {
  a: 1,
  b: '你好',
  c: 'hello',
  d: undefined,
  e: null,
  f: true,
};

const postBody = {
  a: 1,
  b: '你好',
  c: 'hello',
  d: undefined,
  e: null,
  f: true,
  g: [1, 2, 3, {
    a: 1,
    b: 2,
    c: undefined,
  }],
  h: {
    a: 1,
  },
};

function genSuccess(type) {
  const res = function(res) {
    console.info(type + ' test success!', res.data);
  }
  return res;
}
function genError(type) {
  const res = function(e) {
    console.error(type + ' test error!', e);
  }
  return res;
}

function test() {
  console.log('Test start...');
  // basic get
  instance.get('/', {
    params: getParams,
  }).then(genSuccess('basic get'), genError('basic get'));

  // basic post
  instance.post('/', {
    data: postBody,
  }).then(genSuccess('basic post'), genError('basic post'));
}

module.exports = test;










