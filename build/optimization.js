const constants = require('./constants')
const config = require('./config')
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const produtionConfig = {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test: /moment|lodash|mobx/,
                name: 'split-vendor',
                chunks: 'all'
            }
        }
    },
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: Boolean(config.sourceMap)
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                reduceIdents: false,
                autoprefixer: false,
                zIndex: false,
            }
        }),
    ]
}

// if (constants.APP_ENV === 'prod') {
//     produtionConfig.minimizer.push(
//         new UglifyJsPlugin({
//             uglifyOptions: {
//                 warnings: false,
//                 compress: {
//                     drop_console: true,
//                 },
//             }
//         })
//     )
// }

module.exports =
    constants.NODE_ENV === 'development'
        ? {}
        : produtionConfig
