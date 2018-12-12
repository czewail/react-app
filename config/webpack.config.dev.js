const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src') // __dirname 中的src目录，以此类推
const APP_FILE = path.resolve(ROOT_PATH, 'index.js') // 根目录文件app.jsx地址
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist') // 发布文件所存放的目录

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: {
    app: APP_FILE
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
                // require('cssnano')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:8]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
                // require('cssnano')()
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              paths: [
                SRC_PATH
              ]
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=1200&name=[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: JSON.stringify('development') //定义编译环境
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(BUILD_PATH, 'index.html'),
      template: path.resolve(ROOT_PATH, 'index.html'),
      publicPath: '/assets/',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    alias: {
      '@': `${SRC_PATH}/`,
    }
  },
  devServer: {
    contentBase: path.join(ROOT_PATH, 'dist'),
    publicPath: '/assets/',
    hot: true,
    port: 9898
  }
}
