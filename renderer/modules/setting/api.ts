import { State } from './type'

// const keyOfLapInfoListText = 'LapInfoListText'

const localStorageKey = 'jsonSettings'
const settingVersion = 1
const defaultState: State = {
  settingVersion,
  agendaListText: 'Agenda1,60\nAgenda2,180',
  avoidFinished: true,
  backgroundAlphaRate: 0.7,
}

export const save = (state: State): void => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(state))
}

export const load = (): State => {
  const loadedSettingState = (() => {
    try {
      const loaded = JSON.parse(window.localStorage.getItem(localStorageKey))
      return loaded
        ? Object.keys(defaultState).reduce(
            (acc, x) => ({ ...acc, [x]: loaded[x] ?? defaultState[x] }),
            {},
          )
        : {}
    } catch {
      return {}
    }
  })()
  return { ...defaultState, ...loadedSettingState }
}
