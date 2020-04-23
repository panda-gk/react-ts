const constants = require('./constants')
const { resolve } = require('./utils')

const alias = { mobx: resolve('node_modules/mobx/lib/mobx.min.js') }
if (constants.NODE_ENV === 'development') {
  alias['react-dom'] = '@hot-loader/react-dom'
}

module.exports = alias
