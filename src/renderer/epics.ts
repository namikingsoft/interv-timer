import { combineEpics } from 'redux-observable'
import * as ipcEpics from './modules/ipc/epic'
import * as timerEpics from './modules/timer/epic'
import * as settingEpics from './modules/setting/epic'
import * as updaterEpics from './modules/updater/epic'

export const rootEpic = combineEpics(
  ipcEpics.initialize,
  ipcEpics.localStorageToVisibleOnAllWorkspaces,
  ipcEpics.recieve,
  ipcEpics.send,
  ipcEpics.setVisibleOnAllWorkspaces,
  ipcEpics.localStorageToUpdaterCheckForUpdates,
  timerEpics.calcBaseTime,
  timerEpics.initAfterChangeSetting,
  timerEpics.setStopTime,
  timerEpics.toggleInterval,
  timerEpics.shortcutToggle,
  timerEpics.shortcutLap,
  timerEpics.shortcutUndo,
  settingEpics.initialize,
  settingEpics.load,
  settingEpics.save,
  updaterEpics.available,
  updaterEpics.downloaded,
  updaterEpics.progress,
)
