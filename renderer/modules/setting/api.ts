import { State } from './type'

const localStorageKey = 'jsonSettings'
const settingVersion = 1
const defaultState: State = {
  settingVersion,
  agendaListText: 'Agenda1,60\nAgenda2,180',
  avoidFinished: true,
  backgroundAlphaRate: 0.7,
  skinMode: undefined,
}

export const save = (state: State): void => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(state))
}

export const load = (): State => {
  const loadedSettingState = (() => {
    try {
      const loaded = JSON.parse(window.localStorage.getItem(localStorageKey))
      if (loaded)
        return Object.keys(defaultState).reduce(
          (acc, x) => ({ ...acc, [x]: loaded[x] ?? defaultState[x] }),
          {},
        )
      // TODO: remove after later
      // migrate from v0.1 to v0.2
      // return {}
      const keyOfLapInfoListText = 'LapInfoListText'
      const migrated = {
        ...defaultState,
        agendaListText:
          window.localStorage.getItem(keyOfLapInfoListText) ||
          defaultState.agendaListText,
      }
      save(migrated)
      window.localStorage.removeItem(keyOfLapInfoListText)
      return migrated
    } catch {
      return {}
    }
  })()
  return { ...defaultState, ...loadedSettingState }
}
