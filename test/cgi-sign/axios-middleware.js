const sign = require('./lib');

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