import { app, shell } from 'electron'
import log from 'electron-log'
import serve from 'electron-serve'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import { createWindow } from './helpers/createWindow'
import * as ipc from './ipcs'

log.transports.file.level = 'info'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: '.' })
} else {
  app.setPath('userData', `${app.getPath('userData')}-development`)
}

app.on('window-all-closed', () => {
  app.quit()
})

const main = async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
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
    // cannot exit by cmd + q
    // closable: false,
  })

  // open browser on target blank
  // refs. https://qiita.com/k0kubun/items/baa0b2ee3d25f1e2f86d
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  if (isProd) {
    await mainWindow.loadURL('app://./index.html')
  } else {
    await installExtension(REACT_DEVELOPER_TOOLS)
    await installExtension(REDUX_DEVTOOLS)

    await mainWindow.loadURL(
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/`,
    )
    mainWindow.webContents.openDevTools()
  }

  ipc.initialize(mainWindow, isProd)
}

main()
