const path = require('path');
const baseConfig = require('./webpack.config');

const config = {
    ...baseConfig,

    devtool: 'inline-source-map',

    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: path.resolve(__dirname, 'src'),
        historyApiFallback: true,
        proxy: {
            '/auth': 'http://localhost:8080',
        }
    }
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