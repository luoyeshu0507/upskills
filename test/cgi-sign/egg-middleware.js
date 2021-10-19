const sign = require('./lib');

function getAxiosMiddleware(salt, enabled = true) {
  const middleware = async function(ctx, next) {
    if (enabled) {
      const {
        request: {
          method,
          url,
        },
        query,
        request: {
          body,
        },
      } = ctx;
      const key = sign(method, url, query, body, salt);
      const requestKey = ctx.get('x-cgi-sign');
      console.info(`${method} ${url} request key: ${requestKey}, sign key: ${key}`);
      if (key !== requestKey) {
        ctx.throw(403, 'cgi sign failed');
      }
    }
    await next();
  }
  return middleware;
}

module.exports = getAxiosMiddleware;