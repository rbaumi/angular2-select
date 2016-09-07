module.exports = {
    entry: "./angular2-select",
    output: {
        path: __dirname,
        filename: "./bundle/angular2-select.min.js",
    },
    resolve: {
        extensions: ['', '.js'],
        modules: [
            'node_modules'
        ]
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
};
