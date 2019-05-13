const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: "./index.tsx",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    nodeEnv: 'production',
    mangleWasmImports: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "../public/index.html",
      baseUrl: "/",
      favicon: "../public/favicon.png",
    }),
  ],

  module: {
    noParse: /journey/,

    rules: [
      {
        test: /\.tsx?$/,
        use: [{loader: 'ts-loader'}],
      },

      {
        test: [/\.scss$/, /\.css$/],
        use: ["style-loader", "css-loader"]
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
    ],
  },
};
