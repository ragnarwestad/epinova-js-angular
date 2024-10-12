const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      timers: require.resolve('timers-browserify')
    }
  }
};
