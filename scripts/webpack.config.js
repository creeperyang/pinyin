const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const RULES = [{
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    presets: ['es2015']
  }
}, {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: [
      'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer]
        }
      }]
  })
}]

const ROOT = path.resolve(__dirname, '..')

module.exports = [
  // browser version tiny-pinyin
  {
    entry: path.resolve(ROOT, 'src/index.js'),
    output: {
      filename: 'docs/browser.js',
      path: ROOT,
      libraryTarget: 'umd',
      library: 'Pinyin'
    },
    module: { rules: RULES.slice(0, 1) },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: true,
        mangle: true,
        beautify: false
      })
    ]
  },
  // docs
  {
    output: {
      path: path.resolve(ROOT, 'docs'),
      filename: 'app.js'
    },
    entry: path.resolve(ROOT, 'docs/_source/app.js'),
    module: { rules: RULES },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'tiny-pinyin',
        template: 'docs/_source/index.html',
        filename: 'docs/index.html'
      }),
      new ExtractTextPlugin('docs/app.css')
    ]
  }
]
