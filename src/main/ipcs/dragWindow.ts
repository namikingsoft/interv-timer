import { BrowserWindow, Screen } from 'electron'
import { Initializer } from './type'

interface DependencyInjection {
  screen: Screen
  win: BrowserWindow
}

export const initialize: Initializer<DependencyInjection> =
  ({ screen, win }) =>
  (receiver) => {
    receiver.on((action) => {
      switch (action.type) {
        case 'ipc/dragWindow': {
          const { x, y } = screen.getCursorScreenPoint()
          win.setPosition(x - action.payload.startX, y - action.payload.startY)
        }
      }
    })
  }
