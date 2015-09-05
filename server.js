var express = require('express')
var http = require('http')
var hbs = require('hbs')

var webpackConfig = require('./webpack.config')

var app = express()

var getAssetFilename = require('./webpack.middleware')(app)

app.set('view engine', 'hbs')
hbs.registerHelper('asset_path', getAssetFilename)

// Expose two pages
app.get('/', function (req,res) {
    res.render('index')
})

// Start the HTTP server
var server = http.createServer(app)
server.listen(3200, 'localhost', function (err, result) {
    if (err) {
        console.log(err)
    }
    var address = server.address()
    console.log('Listening at ' + address.address + ":" + address.port)
})
