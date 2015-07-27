process.env.NODE_ENV = 'development';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);


var app = express();
app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors:true,
        cached:false,
        chunkModules:false
    },
    hot: true,
    historyApiFallback: true
}));
app.use(require("webpack-hot-middleware")(compiler));

function sendFile(filename) {
    return function(req, res, next) {
        fs.readFile(path.join(__dirname, filename), 'utf8', function (err, fileContent) {
            if (err) { return next(err); }
            fs.readFile(path.join(webpackConfig.output.path, "webpack-assets.json"), 'utf8', function(err, assetsContent) {
                if (err) { return next(err); }
                try {
                    const assets = JSON.parse(assetsContent);
                    res.send(fileContent.replace(/\{\{WEBPACK\.([^}]+)}}/g, function (wholeMatch, entryName) {
                        return assets[entryName].js;
                    }))
                } catch (e) {
                    next(e);
                }
            })
        })
    }
}

app.get('/', sendFile('index.html'));
app.get('/page2', sendFile('page2.html'));

var server = http.createServer(app);

server.listen(3200, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    const address = server.address();
    console.log('Listening at ' + address.hostname + ":" + address.port);
});
