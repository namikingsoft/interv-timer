import path from 'node:path'
import { app, shell } from 'electron'
import log from 'electron-log'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import { createWindow } from './helpers/createWindow'
import * as ipc from './ipcs'

log.transports.file.level = 'info'

const preloadPath = path.join(__dirname, '..', 'preload', 'index.js')

const indexHtmlPath = path.join(__dirname, '..', 'index.html')

const devServerUrl = process.env.VITE_DEV_SERVER_URL

if (!devServerUrl) {
  app.setPath('userData', `${app.getPath('userData')}-development`)
}

app.on('window-all-closed', () => {
  app.quit()
})

const main = async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', preloadPath, {
    width: 640,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    // avoid burn-in shadow
    // https://stackoverflow.com/questions/59498577/getting-shadow-in-transparent-window-in-electron
    hasShadow: false,
    // avoid white border on top frame
    // https://github.com/electron/electron/issues/13164#issuecomment-479941434
    titleBarStyle: 'customButtonsOnHover',
    // required on fullscreen
    show: false,
    // cannot exit by cmd + q
    // closable: false,
  })

  // on fullscreen hack for macos
  mainWindow.on('ready-to-show', () => {
    app.dock && app.dock.hide()
    mainWindow.show()
    app.dock && app.dock.show()
  })

  // open url in a browser and prevent default
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  ipc.initialize(mainWindow, !devServerUrl)

  if (devServerUrl) {
    await installExtension(REACT_DEVELOPER_TOOLS)
    await installExtension(REDUX_DEVTOOLS)

    await mainWindow.loadURL(devServerUrl)
    mainWindow.webContents.openDevTools()
  } else {
    await mainWindow.loadFile(indexHtmlPath)
  }
}

main()
