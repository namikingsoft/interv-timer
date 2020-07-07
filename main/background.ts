import { app, dialog, ipcMain } from 'electron'
import log from 'electron-log'
import serve from 'electron-serve'
import { autoUpdater } from 'electron-updater'
import { createWindow } from './helpers'

log.transports.file.level = 'info'
autoUpdater.logger = log

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('quit', () => {
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

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  autoUpdater.on(
    'update-downloaded',
    async (event, releaseNotes, releaseName) => {
      const result = await dialog.showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['Restart', 'Later'],
        defaultId: 0,
        cancelId: 999,
        message: 'New version is available',
        detail: releaseName,
      })
      if (result.response === 0) autoUpdater.quitAndInstall()
    },
  )

  autoUpdater.checkForUpdates()
  setInterval(() => autoUpdater.checkForUpdates(), 10 * 60 * 1000) // check every 10 min
}

main()
