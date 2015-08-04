'use strict'

const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const WebpackEntryBuilder = require('./webpack-entry-builder')

const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development'

const entryBuilder = new WebpackEntryBuilder(IS_DEVELOPMENT_MODE ? [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server'
] : [])

entryBuilder.add({ page2: './src/page2' }, 'vendorlite', ['react'])
entryBuilder.add({ index: './src/index' }, 'vendor', ['react', './src/mega'])

module.exports = {
    debug: false,
    devtool: IS_DEVELOPMENT_MODE ? 'cheap-module-eval-source-map' : 'source-map',
    entry: entryBuilder.entries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: IS_DEVELOPMENT_MODE ? '[name].dev.js' : '[name].[chunkhash].js',
        chunkFilename: '[name].[id].[chunkhash].js',
        pathinfo: IS_DEVELOPMENT_MODE,
        publicPath: '/static/'
    },
    plugins: entryBuilder.plugins.concat([

        // Common plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(IS_DEVELOPMENT_MODE ? 'development' : 'production')
        }),
        new AssetsPlugin({path: path.join(__dirname, 'dist')})

    ], IS_DEVELOPMENT_MODE ? [

        // Dev-only plugins
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()

    ] : [

        // Production-only plugins
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]),
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: ( IS_DEVELOPMENT_MODE ? [

            // Development-only loaders
            {
                test: /\.jsx?$/,
                loader: 'react-hot'
            }

        ] : [ /* No production-only loaders */ ]).concat([

            // Common loaders
            {
                test: /\.jsx?$/,
                loader: 'babel?optional[]=runtime&stage=0',
                exclude: /node_modules/
            }

        ])
    }
}