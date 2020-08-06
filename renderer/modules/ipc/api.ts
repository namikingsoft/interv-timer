import { ipcRenderer } from 'electron'
import { RequestAction, RecieveAction } from './type'

const channelName = 'ipcAction'

export const send = (action: RequestAction): void =>
  ipcRenderer.send(channelName, action)

export const on = (
  callback: (event: Event, action: RecieveAction) => void,
): void => {
  ipcRenderer.on(channelName, callback)
}
