const devSetup = require('./webpack.development');

module.exports = {
  ...devSetup,
  mode: 'production',
  devtool: 'none',
};
