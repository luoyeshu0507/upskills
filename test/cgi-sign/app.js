const test = require('./test/test');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    test();
  }
}

module.exports = AppBootHook;
