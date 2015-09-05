var DEVELOPMENT_MODE = process.env.NODE_ENV === 'development'

var express = require('express')
var http = require('http')
var path = require('path')
var fs = require('fs')

var webpackConfig = require('./webpack.config')

var app = express()

var getAssetFilename = require('./webpack.middleware')(app)
var sendFile = require('./fake-handlebars', getAssetFilename)

// Expose two paths
app.get('/', sendFile('index.html'))
app.get('/page2', sendFile('page2.html'))

// Start the HTTP server
var server = http.createServer(app)
server.listen(3200, 'localhost', function (err, result) {
    if (err) {
        console.log(err)
    }
    var address = server.address()
    console.log('Listening at ' + address.hostname + ":" + address.port)
})
