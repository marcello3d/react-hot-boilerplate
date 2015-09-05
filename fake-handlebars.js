// This is a super minimal handlebars-like templating (replaces {{WEBPACK.foo}} with the assets path for 'foo')
// I didn't want to enforce a strong opinion here
module.exports = function sendFile(filename, getAssetFilename) {
    return function (req, res, next) {
        fs.readFile(path.join(__dirname, filename), 'utf8', function (err, fileContent) {
            if (err) {
                return next(err)
            }
            // Read the webpack assets json file (this includes the full hashed versions of files)
            res.send(fileContent.replace(/\{\{WEBPACK\.([^}]+)}}/g, function (wholeMatch, entryName) {
                return getAssetFilename(entryName)
            }))
        })
    }
}