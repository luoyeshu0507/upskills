const md5 = require('blueimp-md5');

/**
 * get type of variable
 * @param  {Any} val variable to get type
 * @return {String}     undefined | null | string | number | object | function | boolean | symbol | regexp | url ...
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
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => {
      switch(_getType(obj[key])) {
        case 'string':
        case 'null':
        case 'number':
        case 'boolean':
          res.push(`${key}=${obj[key]}`);
          break;
        case 'undefined':
          res.push(`${key}=`);
          break;
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
 * parse request body
 * @param  {Object} body request body object
 * @return {Array}      body object key array
 */
function _parseBody(body = {}) {
  let res = [];
  Object.keys(params)
    .sort()
    .filter((key) => params[key] !== undefined)
    .forEach((key) => {
      
    });
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
  method = method.toLowerCase();
  path = path.replace(/^\/|\/$/g, '');
  let arr = [method, path];
  arr = arr.concat(_parseObject2array(params), _parseObject2array(body));
  arr.push(salt);
  return md5(arr.join('&'));
}

module.exports = sign;
