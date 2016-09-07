module.exports = {
    entry: "./app/boot",
    output: {
        path: __dirname,
        filename: "./bundle.js",
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
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
    },
    watch: true
};
