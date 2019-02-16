const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src') // __dirname 中的src目录，以此类推
const APP_FILE = path.resolve(ROOT_PATH, 'index.js') // 根目录文件app.jsx地址
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist/assets') // 发布文件所存放的目录

module.exports = {
  mode: 'production',
  entry: {
    app: APP_FILE
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
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
          MiniCssExtractPlugin.loader,
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
        include: /node_modules\/antd/,
        use: [
          MiniCssExtractPlugin.loader,
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
          'less-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules\/antd/,
        use: [
          MiniCssExtractPlugin.loader,
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
          'less-loader'
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
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[chunkhash:5].chunk.css"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(BUILD_PATH, '../index.html'),
      template: path.resolve(ROOT_PATH, 'index.html'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    alias: {
      '@': `${SRC_PATH}/`,
    },
    modules: [
      'node_modules',
      'src',
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -20,
          chunks: "all"
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
