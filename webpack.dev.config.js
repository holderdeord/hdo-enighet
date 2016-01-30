var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './components/App'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb$/),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders: [
            { test: /\.scss$/, loader: 'style!css!postcss!sass' },
            { test: /\.css$/, loader: 'style!css!postcss' },
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: [
                    path.join(__dirname, 'components')
                ]
            }
        ]
    },
    postcss: function() {
        return [autoprefixer, precss];
    }
};
