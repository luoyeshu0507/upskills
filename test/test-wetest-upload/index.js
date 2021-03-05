/**
 * 上传文件类 - wetest文件平台
 */
const crypto = require('crypto');
const urllib = require('urllib');
const path = require('path');
const querystring = require('querystring');
const formstream = require('formstream');

const APP_SERCET_KEY = '1jXn2xAui80fpRQqFoPHZZT622k';
const FILE_KEY = 'screen_cut-store';
const DOWNLOAD_HOST = 'http://test.files.cloudtest.woa.com/files/';

// 加密
const encrypt = (algorithm, content) => {
  const hash = crypto.createHash(algorithm);
  hash.update(content);
  return hash.digest('hex');
};

const makeSign = (method, path, secret, params) => {
  const mk = makeSource(method, path, params);
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(mk).digest('base64');
}

/**
 * 对参数排序编码拼接
 * @param method
 * @param urlPath
 * @param params
 */
const makeSource = (method, urlPath, params) => {
  const qs = Object.keys(params)
    .sort()
    .filter((key) => params[key] !== undefined)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return (
    method.toUpperCase() +
    '&' +
    encodeURIComponent(urlPath) +
    '&' +
    encodeURIComponent(qs).replace(/\*/g, '%2A').replace(/~/g, '%7E')
  );
}

class WetestFile {
    /**
     * 上传文件
     * @param {string} cutUrl 截图网址
     * @param {string} filepath 本地的文件位置，通常是临时的
     * @param {string} dir 上传到服务器的哪个目录
     * @param {string} filename 文件名
     * @param {string} extname 文件扩展名
     * @return {JSON} json
     */
    static async upload(cutUrl, filepath, dir = '/', filename = '', extname = 'png') {
      const name = crypto.createHash('md5').update(filename).digest('hex') + '.' + extname;
      // const {
      //     buid,
      //     key,
      //     upLoadHost,
      // } = config.weTestEggUploader;

      const t = parseInt(new Date().getTime() / 1000);
      const nonce = parseInt(Math.random() * 1000000);
      const urlPath = '/store/' + FILE_KEY + dir + name;
      const requestData = {
        t,
        nonce,
      };
      const sign = makeSign('post', urlPath, APP_SERCET_KEY, requestData);
      requestData.sign = sign;
      var form = formstream();
      form.file('data', filepath);
      const { data } = await urllib.request('http://service-platform-file' + urlPath + '?' + querystring.stringify(requestData), {
        method: 'POST',
        headers: form.headers(),
        dataType: 'json',
        stream: form,
      });
      console.log(data);
      return data;
    }

    /**
     * 获取下载地址
     * @param {string} _
     * @param {string} dir 上传到服务器的哪个目录
     * @param {string} filename 文件名
     * @param {string} extname 文件扩展名
     * @return {JSON} json
     */
    static url(dir, _, filename = '', extname = 'png') {
      const name = crypto.createHash('md5').update(filename).digest('hex') + '.' + extname;
      const filePath = DOWNLOAD_HOST + FILE_KEY + dir + name;
      const t = parseInt((new Date()) / 1000);
      const nonce = Math.round(Math.random() * 1000);
      const token = encrypt('sha256', `${FILE_KEY}|${filePath}|${APP_SERCET_KEY}|${nonce}|${t}`);
      return `${filePath}?nonce=${nonce}&t=${t}&token=${token}`;
    }
}

WetestFile.upload('', path.resolve('./index.js'), '/js/', 'index', 'js');

module.exports = WetestFile;
