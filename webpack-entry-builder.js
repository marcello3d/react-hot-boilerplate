
const webpack = require('webpack')

module.exports = WebpackEntryBuilder

function WebpackEntryBuilder(sharedCommons) {
    this.sharedCommons = sharedCommons
    this.entries = {}
    this.plugins = []
}


/**
 * Add a set of
 * @param vendorName
 * @param vendorCommons
 * @param entries
 */
WebpackEntryBuilder.prototype.add = function VendorBuilder_add(entries, vendorName, vendorCommons) {
    const self = this
    if (vendorName) {
        if (self.entries[vendorName]) {
            throw new Error("duplicate vendor name (must be unique amongst entries and vendors): " + vendorName)
        }
        if (self.sharedCommons) {
            vendorCommons = self.sharedCommons.concat(vendorCommons)
        }
        self.entries[vendorName] = vendorCommons
        self.plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: vendorName,
            selectedChunks: Object.keys(entries)
        }))
    }
    Object.keys(entries).forEach(function (entry) {
        if (self.entries[entry]) {
            throw new Error("duplicate entry name (must be unique amongst entries and vendors): "+entry)
        }
        self.entries[entry] = entries[entry]
    })
}
