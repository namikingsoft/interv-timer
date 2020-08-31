import { App, BrowserWindow } from 'electron'
import { Initializer } from './type'

interface DependencyInjection {
  app: App
  win: BrowserWindow
}

export const initialize: Initializer<DependencyInjection> = ({ app, win }) => (
  receiver,
) => {
  receiver.on((action) => {
    switch (action.type) {
      case 'ipc/quit':
        app.quit()
        break
      case 'ipc/setVisibleOnAllWorkspaces':
        win.setVisibleOnAllWorkspaces(action.payload)
        break
    }
  })
}
