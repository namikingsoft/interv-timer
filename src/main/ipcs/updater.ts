import { AppUpdater } from 'electron-updater'
import { Initializer } from './type'

interface DependencyInjection {
  autoUpdater: AppUpdater
  isProd: boolean
}

export const initialize: Initializer<DependencyInjection> = ({
  autoUpdater,
  isProd,
}) => (receiver, sender) => {
  if (isProd) {
    autoUpdater.on('update-available', ({ version }) => {
      sender.send({ type: 'ipc/updaterAvailable', payload: { version } })
    })

    autoUpdater.on('update-downloaded', ({ version }) => {
      sender.send({ type: 'ipc/updaterDownloaded', payload: { version } })
    })

    autoUpdater.on('error', (err) => {
      sender.send({ type: 'ipc/updaterError', payload: err })
    })

    autoUpdater.on('download-progress', ({ percent }) => {
      sender.send({ type: 'ipc/updaterProgress', payload: { percent } })
    })

    autoUpdater.checkForUpdates()
    setInterval(() => autoUpdater.checkForUpdates(), 10 * 60 * 1000) // check every 10 min
  } else {
    // only dev
    ;(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      sender.send({
        type: 'ipc/updaterAvailable',
        payload: { version: 'v0.0.0-test' },
      })
      await new Promise((resolve) => setTimeout(resolve, 500))
      sender.send({
        type: 'ipc/updaterProgress',
        payload: { percent: 25 },
      })
      await new Promise((resolve) => setTimeout(resolve, 500))
      sender.send({
        type: 'ipc/updaterProgress',
        payload: { percent: 50 },
      })
      await new Promise((resolve) => setTimeout(resolve, 500))
      sender.send({
        type: 'ipc/updaterProgress',
        payload: { percent: 75 },
      })
      await new Promise((resolve) => setTimeout(resolve, 500))
      sender.send({
        type: 'ipc/updaterDownloaded',
        payload: { version: 'v0.0.0-test' },
      })
    })()
  }

  receiver.on((action) => {
    switch (action.type) {
      case 'ipc/updaterQuitAndInstall':
        autoUpdater.quitAndInstall()
    }
  })
}
