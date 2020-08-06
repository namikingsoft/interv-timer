import { BrowserWindow, ipcMain, app } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import * as appIpc from './app'
import * as updater from './updater'

const channelName = 'ipcAction'

autoUpdater.logger = log

export const initialize = (window: BrowserWindow, isProd: boolean): void => {
  const receiver = {
    on: (callback) => {
      ipcMain.on(channelName, (_, payload) => callback(payload))
    },
  }
  const sender = {
    send: (payload) => {
      window.webContents.send(channelName, payload)
    },
  }

  appIpc.initialize({ app })(receiver, sender)
  updater.initialize({ autoUpdater, isProd })(receiver, sender)
}
