import { RequestAction, RecieveAction } from './type'

const channelName = 'ipcAction'

export const send = (action: RequestAction): void =>
  window.ipcRenderer.send(channelName, action)

export const on = (
  callback: (event: Event, action: RecieveAction) => void,
): void => {
  window.ipcRenderer.on(channelName, callback)
}
