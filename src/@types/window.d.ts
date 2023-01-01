import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    platform: string // process.platform
    ipcRenderer: IpcRenderer
  }
}
