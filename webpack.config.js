const webpack = require('webpack');
const path = require('path');

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