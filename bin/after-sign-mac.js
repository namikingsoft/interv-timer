/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { notarize } = require('electron-notarize')

const configPath = path.resolve(__dirname, '../package.json')
const configBuild = require(configPath).build

const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_PASSWORD
const ascProvider = process.env.ASC_PROVIDER

const appBundleId = configBuild.appId
const appPath = path.resolve(
  __dirname,
  `../release/mac/${configBuild.productName}.app`,
)

async function notarizeApp() {
  console.log(`afterSign: Notarizing ${appBundleId} in ${appPath}`)
  await notarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
    ascProvider,
  })
  console.log('afterSign: Notarized')
}

exports.default = async () => {
  if (
    !(
      process.platform === 'darwin' &&
      appleId &&
      appleIdPassword &&
      ascProvider
    )
  ) {
    console.log('afterSign: Skip notarize')
    return
  }
  await notarizeApp()
}
