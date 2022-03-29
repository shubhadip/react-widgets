
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OUTPUT_PATH = path.join(__dirname, 'build');

const WEBPACK_LOADER_RULES = {
  rules: [
    {
      test: /\.(scss|css)$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
      }],
      exclude: /node_modules/,
    },
    {
      test: /\.js?$/,
      use: [
        {
          loader: 'babel-loader',
        }
      ],
      exclude: /node_modules/
    },
  ]
}

const config = {
  entry: './src/index.js',
  plugins:[
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css' ,
      chunkFilename: '[id].css',
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client.html'),
      filename: 'index.html',
      async: ['app', 'vendor'],
    }),
  ],
  mode:"development",
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer:{
    historyApiFallback: true,
    overlay: true,
    hot: true,
    port: 8082,
    disableHostCheck: true,   // That solved it
    stats: {
      color: true,
    },
  },
  module: WEBPACK_LOADER_RULES,
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.css'
    ]
  },
}


module.exports = config;