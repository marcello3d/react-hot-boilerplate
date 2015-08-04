var DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var webpackConfig = require('./webpack.config');

var app = express();
var getAssetFilename

if (DEVELOPMENT_MODE) {

    // Only require these in development mode
    var webpack = require('webpack');
    var compiler = webpack(webpackConfig);

    // Adds support for compiling and serving up webpack
    app.use(require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            cached: false,
            chunkModules: false
        },
        hot: true,
        historyApiFallback: true
    }));

    // Adds support for hot reloading of modules
    app.use(require("webpack-hot-middleware")(compiler));

    // This code is effectively doing what the AssetsPlugin is doing, mapping from webpack entry to output file
    // Currently it only supports replacing `[name]`, so it could break if you change webpack.config.js
    getAssetFilename = function(entryName) {
        return path.join(
            webpackConfig.output.publicPath,
            webpackConfig.output.filename.replace(/\[name\]/g, entryName)
        ) + '?' + Date.now()
    }
} else {
    // For production we want to cache the assets file at launch

    // Read the webpack assets json file (this includes the full hashed versions of files)
    var assetsJson = require(path.join(webpackConfig.output.path, "webpack-assets.json"));
    getAssetFilename = function(entryName) {
        return assetsJson[entryName].js
    }

    // TODO: serve static files
}

// This is a super minimal handlebars-like templating (replaces {{WEBPACK.foo}} with the assets path for 'foo')
function sendFile(filename) {
    return function(req, res, next) {
        fs.readFile(path.join(__dirname, filename), 'utf8', function (err, fileContent) {
            if (err) { return next(err); }
            // Read the webpack assets json file (this includes the full hashed versions of files)
            res.send(fileContent.replace(/\{\{WEBPACK\.([^}]+)}}/g, function (wholeMatch, entryName) {
                return getAssetFilename(entryName);
            }))
        })
    }
}

// Expose two paths
app.get('/', sendFile('index.html'));
app.get('/page2', sendFile('page2.html'));

// Start the HTTP server
var server = http.createServer(app);
server.listen(3200, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    const address = server.address();
    console.log('Listening at ' + address.hostname + ":" + address.port);
});
