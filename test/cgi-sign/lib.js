const md5 = require('blueimp-md5');

/**
 * get type of variable
 * @param  {Any} val variable to get type
 * @return {String}     undefined | null | string | number | object | function | boolean | symbol | regexp | url | array ...
 */
function _getType(val) {
  return Object.prototype.toString.call(val).toLowerCase().replace(/^\[object\s|\]$/g, '');
}

/**
 * parse object key values to array of key=value
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function _parseObject2array(obj) {
  let res = [];
  Object.keys(obj)
    .sort()
    .filter((key) => obj[key] !== undefined && obj[key] !== null)
    .forEach((key) => {
      switch(_getType(obj[key])) {
        case 'string':
        case 'null':
        case 'number':
        case 'boolean':
          res.push(`${key}=${obj[key]}`);
          break;
        case 'array':
        case 'object':
          res = res.concat(_parseObject2array(obj[key]));
          break;
        default:
          res.push(`${key}=${obj[key]}`);
      }
    });
  return res;
}

/**
 * make sign of request
 * @param  {String} method request method
 * @param  {String} path   request path
 * @param  {Object} params request query object
 * @param  {Object} body   request body object
 * @param  {String} salt   sign salt
 * @return {String}        sign string
 */
function sign(method = 'get', path = '', params = {}, body = {}, salt = '') {
  path = path.replace(/\?.*/, '');
  method = method.toLowerCase();
  path = path.replace(/^\/|\/$/g, '');
  let arr = [method, path];
  arr = arr.concat(_parseObject2array(params), _parseObject2array(body));
  arr.push(salt);
  return md5(arr.join('&'));
}

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

console.log(_parseObject2array);

module.exports = sign;
