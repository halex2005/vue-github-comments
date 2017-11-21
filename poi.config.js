const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Config = require("webpack-chain")

// poi.config.js
module.exports = {
  vendor: false,
  webpack: new Config()
    .externals({
      'vue': 'Vue',
    })
    //.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin).end()
    .toConfig()
}
