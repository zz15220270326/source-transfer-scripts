const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = !process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,

  entry: {
    'index': resolve(__dirname, 'src/scripts/index.ts'),
    'videoTransfer': resolve(__dirname, 'src/scripts/videoTransfer.ts'),
    'audoTransfer': resolve(__dirname, 'src/scripts/audioTransfer.ts'),
    'detail': resolve(__dirname, 'src/scripts/detail.ts'),
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name]-[hash:8].js',
    clean: true
  },

  target: ['web', 'es5'],

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],

  devtool: isProd ? undefined : 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(ejs|tpl)$/,
        loader: 'ejs-loader',
        options: {
          variable: 'data',
          interpolate : '\\{\\{(.+?)\\}\\}',
          evaluate : '\\[\\[(.+?)\\]\\]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts', '.json', '.tpl', '.ejs'],
  },

  devServer: {
    host: '0.0.0.0',
    port: 9241,
    proxy: {},
    historyApiFallback: true,
  },
};