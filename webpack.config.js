var webpack = require('webpack');
var path = require('path');

// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './examples/webpack-dev-server/polyfills.browser.ts',
        'vendor': './examples/webpack-dev-server/vendor.browser.ts',
        'main': './examples/webpack-dev-server/main.browser.ts',
    },

    output: {
        path: './examples/webpack-bundled/dist',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            }, {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    }

};

// Our Webpack Defaults
var defaultConfig = {
    devtool: 'source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [path.join(__dirname, 'examples/webpack-dev-server')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
