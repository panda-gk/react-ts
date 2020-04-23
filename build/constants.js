const APP_ENV = process.env.APP_ENV || 'prod'
const NODE_ENV = process.env.NODE_ENV || 'production'
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

module.exports = {
    APP_ENV,
    NODE_ENV,
    FILE_EXTENSIONS
}
