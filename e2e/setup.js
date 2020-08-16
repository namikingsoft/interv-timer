/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const screenshotDirPath = path.resolve(__dirname, '..', '.work', 'screenshot')

module.exports = () => {
  try {
    fs.rmdirSync(screenshotDirPath, { recursive: true })
  } catch (err) {} // force true when no such dir
  fs.mkdirSync(screenshotDirPath, { recursive: true })
}
