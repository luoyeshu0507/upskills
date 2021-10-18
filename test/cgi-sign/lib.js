/**
 * get type of variable
 * @param  {Any} val variable to get type
 * @return {String}     undefined | null | string | number | object | function | boolean | symbol | regexp | url ...
 */
function _getType(val) {
  return Object.prototype.toString.call(val).toLowerCase().replace(/^\[object\s|\]$/g, '');
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
  Object.keys(params)
    .sort()
    .filter((key) => params[key] !== undefined)
    .forEach((key) => arr.push(`${key}=${params[key]}`));

  arr.push(salt);
}