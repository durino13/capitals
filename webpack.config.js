const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: [path.join(__dirname, 'resources/assets/js')]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: 'public/assets/js',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CleanWebpackPlugin(['fonts'], {
            dry: "false"
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/font-awesome/fonts',
                to: '../fonts'
            }
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: ['babel'],
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-decorators-legacy' ],
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};