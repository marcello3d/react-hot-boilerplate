var IS_DEVELOPMENT_MODE = require('./is-development-mode')

var path = require('path')
var webpackConfig = require('./webpack.config')

module.exports = function webpackMiddleware(app) {

  if (IS_DEVELOPMENT_MODE) {
    // Only require in development mode
    var compiler = require('webpack')(webpackConfig)

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
    }))

    // Adds support for hot reloading of modules
    app.use(require("webpack-hot-middleware")(compiler))

    // This code is effectively doing what the AssetsPlugin is doing, mapping from webpack entry to output file
    // Currently it only supports replacing `[name]`, so it could break if you change webpack.config.js
    return function development_getAssetFilename(entryName) {
      return path.join(
          webpackConfig.output.publicPath,
          webpackConfig.output.filename.replace(/\[name\]/g, entryName)
        ) + '?' + Date.now().toString(36)
    }
  }
  // For production we want to cache the assets file at launch

  // Read the webpack assets json file (this includes the full hashed versions of files)
  var getAssetFilename

  var assetsFilename = path.join(webpackConfig.output.path, "webpack-assets.json")
  try {
    var assetsJson = require(assetsFilename)
    getAssetFilename = function production_getAssetFilename(entryName) {
      return assetsJson[entryName].js
    }
  } catch (e) {
    console.error("Couldn't load " + assetsFilename + ", did you run `npm run build` first?")
    throw e
  }

  // Serve built webpack files
  var serveStatic = require('serve-static')
  app.use(webpackConfig.output.publicPath, serveStatic(webpackConfig.output.path))

  return getAssetFilename
}