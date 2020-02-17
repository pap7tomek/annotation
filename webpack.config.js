var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/WrapperComponent.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'WrapperComponent.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                exclude: /(node_modules)/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    externals: {
        "react": "react",
        "react-dom": "react-dom"
     }
}