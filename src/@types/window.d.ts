import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    platform: typeof process.platform
    ipcRenderer: IpcRenderer
  }
}
