var path = require('path');

module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, './test-loader.js'),
            options: {
              name: 'abc'
            }
          }
        ]
      }
    ] 
  }
}