'use strict'

var path = require('path')
var webpack = require('webpack')
var AssetsPlugin = require('assets-webpack-plugin')

var IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development'

module.exports = {
    debug: false,
    devtool: IS_DEVELOPMENT_MODE ? 'cheap-module-eval-source-map' : 'source-map',
    entry: {

        // Your JavaScript entry-points
        index: './src/index',
        page2: './src/page2',

        // Shared vendor entry-point
        vendor: [

            // Common modules to require in vendor
            'react'

        ].concat(IS_DEVELOPMENT_MODE ? [

            // Development-only modules to require in vendor
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server'

        ] : [
            // Production-only modules to require in vendor
        ])
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: IS_DEVELOPMENT_MODE ? '[name].dev.js' : '[name].[chunkhash].js',
        chunkFilename: '[name].[id].[chunkhash].js',
        pathinfo: IS_DEVELOPMENT_MODE,
        publicPath: '/static/'
    },
    plugins: [

        // Common plugins
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(IS_DEVELOPMENT_MODE ? 'development' : 'production')
        })

    ].concat(IS_DEVELOPMENT_MODE ? [

        // Dev-only plugins
        new webpack.HotModuleReplacementPlugin(), // This generates delta patches for changing modules at runtime
        new webpack.NoErrorsPlugin() // This allows the server to continue after errors

    ] : [

        // Production-only plugins
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({ // This minifies/obfuscates your code
            compress: {
                warnings: false
            }
        }),
        new AssetsPlugin({path: path.join(__dirname, 'dist')})
    ]),
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: ( IS_DEVELOPMENT_MODE ? [

            // Development-only loaders
            {
                // Hot swap React components
                test: /\.jsx?$/,
                loader: 'react-hot'
            }

        ] : [ /* No production-only loaders */ ]).concat([

            // Common loaders
            {
                // Transpile ES6/JSX code to ES5
                test: /\.jsx?$/,
                loader: 'babel?optional[]=runtime&stage=0',
                exclude: /node_modules/
            }

        ])
    }
}