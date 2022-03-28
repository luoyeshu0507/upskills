const eggMiddleware = require('../egg-middleware')('1234');

module.exports = app => {
  const { router, controller } = app;
  router.get('/', eggMiddleware, controller.home.index);
  router.post('/', eggMiddleware, controller.home.index);
};
