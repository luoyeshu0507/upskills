const sign = require('./lib');

/**
 * generate axios middleware
 * @param  {String}  salt    salt for md5
 * @param  {Boolean} enabled if sign enabled
 * @return {Function}          axios middleware
 */
function getAxiosMiddleware(salt, enabled = true) {
  const middleware = function(config) {
    if (enabled) {
      const {
        url,
        method,
        params,
        data,
      } = config;
      const key = sign(method, url, params, data, salt);
      config.headers['x-cgi-sign'] = key;
      console.info(`${method} ${url} sign key: ${key}`);
    }
    return config;
  }
  return middleware;
}

module.exports = getAxiosMiddleware;