var path = require('path');
console.log(process.env.NODE_ENV);
let config = {
  mode: 'development',
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:
            'https://cdn.wetest.qq.com/fsight-component/' +
            '/dist/'
  }
};

module.exports = function(env) {
  console.log(env);
  return config;
}