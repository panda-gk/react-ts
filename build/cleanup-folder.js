const fs = require('fs-extra')
const path = require('path')

const constants = require('./constants')
if (constants.NODE_ENV !== 'development') {
    fs.emptyDirSync(path.join(__dirname, `../dist`))
}
