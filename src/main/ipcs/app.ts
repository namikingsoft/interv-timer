import { App } from 'electron'
import { Initializer } from './type'

interface DependencyInjection {
  app: App
}

export const initialize: Initializer<DependencyInjection> = ({ app }) => (
  receiver,
) => {
  receiver.on((action) => {
    switch (action.type) {
      case 'ipc/quit':
        app.quit()
    }
  })
}
