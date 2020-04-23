const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const config = require('./config')
const constants = require('./constants')
const styleRules = require('./rules/styleRules')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const { assetsPath, resolve } = require('./utils')
const optimization = require('./optimization')
const alias = require('./alias')
const pkg = require('./../package.json')
const needHost = require('./needHost')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
require('./cleanup-folder')

if (process.env.npm_config_report) {
    plugins.push(
        new BundleAnalyzerPlugin()
    )
}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: { app: ['./src/index.tsx'] },
    output: {
        path: config.assetsRoot,
        filename: constants.NODE_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: constants.NODE_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash].js'),
        publicPath: config.assetsPublicPath,
        pathinfo: false
    },
    resolve: {
        extensions: constants.FILE_EXTENSIONS,
        modules: [resolve('src'), resolve('node_modules')],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('tsconfig.webpack.json'),
                extensions: constants.FILE_EXTENSIONS
            })
        ],
        alias
    },
    module: {
        rules: [...styleRules, ...jsRules, ...fileRules]
    },
    plugins,
    optimization,
    stats: {
        children: false,
        warningsFilter: /mini-css-extract-plugin[^]*Conflicting order between:/
    },
    devtool: config.sourceMap,
    devServer: {
      host: needHost.needHost,
      historyApiFallback: true,
      inline: true, //添加
      hot: true,  
    }
}
