var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./../webpack.dev.config');

new WebpackDevServer(webpack(config), {
    contentBase: './public',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    console.log(err || 'Listening at localhost:3000');
});
