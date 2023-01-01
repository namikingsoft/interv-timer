import { ipcRenderer } from 'electron'

process.once('loaded', () => {
  global.platform = process.platform
  global.ipcRenderer = ipcRenderer
})
