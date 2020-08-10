import { combineEpics } from 'redux-observable'
import * as ipcEpics from './modules/ipc/epic'
import * as timerEpics from './modules/timer/epic'
import * as settingEpics from './modules/setting/epic'
import * as updaterEpics from './modules/updater/epic'

export const rootEpic = combineEpics(
  ...Object.values(ipcEpics),
  ...Object.values(timerEpics),
  ...Object.values(settingEpics),
  ...Object.values(updaterEpics),
)
