const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: '#inline-source-map',
  entry: path.join(__dirname, '../src/app.js'),
  output: {
    path: path.join(__dirname, '../dist/assets'),
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      components: path.join(__dirname, '../src/components'),
      icons: path.join(__dirname, '../src/components/icons'),
      styles: path.join(__dirname, '../src/styles'),
      bower: path.join(__dirname, '../bower_components')
    },
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.svg']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, '../bower_components')]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: require('../src/styles/antd-reset/theme.js')
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[hash].[ext]'
            }
          }
        ],
        exclude: /fonts/
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'svgr/webpack',
            options: {
              replaceAttrValues: [['#4c6472', 'currentColor']],
              title: false,
              icon: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    hot: true,
    clientLogLevel: 'none',
    stats: {
      modules: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new CleanWebpackPlugin(path.join(__dirname, '../dist/assets'), {
      root: path.join(__dirname, '..')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
