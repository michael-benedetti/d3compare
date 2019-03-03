const path = require('path');
const baseConfig = require('./webpack.config');

const config = {
  ...baseConfig,

  devtool: 'inline-source-map',

  entry: {
    test_entry: "../spec/index_test"
  },

  output: {
    path: path.resolve("./out"),
    filename: "[name].js"
  },
};

config.module.rules.push(
  {
    enforce: "pre",
    test: /\.js$/,
    loader: "source-map-loader",
    // quiet warning about missing source map
    exclude: [
      /node_modules\/mutationobserver-shim/
    ]
  }
);

module.exports = config;