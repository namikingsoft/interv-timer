import { combineReducers } from 'redux'
import { timer } from './modules/timer/reducer'
import { setting } from './modules/setting/reducer'
import { updater } from './modules/updater/reducer'

export const rootReducer = combineReducers({ timer, setting, updater })
