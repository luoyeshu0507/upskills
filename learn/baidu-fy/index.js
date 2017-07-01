const crypto = require('crypto');
const axios = require('axios');

const baidyFyConfig = {
  appid: '20170629000060873',
  key: 'GwsM4ZhNNRwQ8tUeXkGO'
}

const md5 = (text) => {
  text = String(text);
  return crypto.createHash('md5').update(text).digest('hex');
};

const getToken = (q) => {
  var token ={
    salt: Math.random().toString().substr(2)
  }
  token.sign = md5(`${baidyFyConfig.appid}${q}${token.salt}${baidyFyConfig.key}`)
  return token;
}

const fy = (q, from, to) => {
  var token = getToken(q);
  return axios.get(`http://api.fanyi.baidu.com/api/trans/vip/translate?q=${q}&from=${from || 'en'}&&to=${to || 'zh'}&appid=${baidyFyConfig.appid}&salt=${token.salt}&sign=${token.sign}`);
}

module.exports = fy;