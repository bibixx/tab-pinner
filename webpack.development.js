const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDir = path.resolve(__dirname, 'build');

const optionsEntryFile = path.resolve(__dirname, './src/options/options.tsx');
const optionsTemplatePath = path.resolve(__dirname, './src/options/options.html');

const backgroundEntryFile = path.resolve(__dirname, './src/background/background.ts');

module.exports = {
  entry: {
    options: optionsEntryFile,
    background: backgroundEntryFile
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                [
                  'emotion',
                  {
                    labelFormat: '[filename]-[local]'
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|mp3|mp4|woff2?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[folder]/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: optionsTemplatePath,
      excludeChunks: ['background']
    }),
    new CopyPlugin([
      { from: 'static' },
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  output: {
    filename: '[name].bundle.js',
    path: outputDir,
    publicPath: '/',
  },
  devServer: {
    contentBase: outputDir,
    index: 'options.html'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
};
