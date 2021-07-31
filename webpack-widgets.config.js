
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require("webpack-stats-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OUTPUT_PATH = path.join(__dirname, 'widgets-build');
const PUBLIC_PATH = '/' //(process.env.STATIC_URL || '/static/') + 'js/build/';

const DIRECTORY_BUNDLE_MAP = {
  'test-one': 'test-one',
  'test-two': 'test-two',
}

const getComponent = (componentAlias) => {
  const component = new RegExp(`.*\\/${DIRECTORY_BUNDLE_MAP[componentAlias]}\\/.*\\.widget.js?$`)
  return component;
}

const BUNDLE_LOADER_RULES =
  Object.keys(DIRECTORY_BUNDLE_MAP).map(function (name) {
    return {
      test: getComponent(name),
      use: [
        {
          loader: 'bundle-loader',
          options: {
            name,
            lazy: true,
          },
        },
      ]
    }
  })

const WEBPACK_LOADER_RULES = {
  rules: [
    ...BUNDLE_LOADER_RULES,
    {
      test: /\.(scss|css)$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
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
  entry: {
    common: [
      'react',
      'react-dom',
      './src/widgets/index.js',
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new StatsWriterPlugin({
      filename: "stats.json" // Default
    })
  ],
  mode: "production",
  output: {
    path: OUTPUT_PATH,
    filename: '[name].[hash].bundle.js',
    publicPath: PUBLIC_PATH,
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
  optimization: {
    runtimeChunk: false
  },
  module: WEBPACK_LOADER_RULES,
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.js',
      '.jsx',
    ]
  },
}

module.exports = config;