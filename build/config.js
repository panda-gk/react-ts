const path = require('path')
const pkg = require('./../package.json')

const constants = require('./constants')

const DOMAIN = 'https://starter.jackple.com'

// static resource domain（CDN）
const STATICDOMAIN = constants.NODE_ENV === 'devdeveloment' ? '' : pkg.version

const sourceMap = constants.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map'

module.exports = {
    index: path.resolve(__dirname, `./../dist/index.html`),
    assetsRoot: path.resolve(__dirname, `./../dist/${STATICDOMAIN}`),
    assetsPublicPath: constants.NODE_ENV === 'development' ? '/' : `${STATICDOMAIN}/`,
    assetsSubDirectory: 'static',
    // page Pattern for workbox
    pagePattern: new RegExp(DOMAIN),
    // id you use CDN, change it!!!
    assetsPattern: new RegExp(`${DOMAIN.replace(/\//g, '\\/')}\\/(static|vendor.dll)`),
    // production sourceMap for monitoring
    sourceMap,
    extractCss: constants.NODE_ENV !== 'development',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
}
