import { State } from './type'

const keyOfLapInfoListText = 'LapInfoListText'
const defaultLapInfoListText = 'label1,60\nlabel2,180'

export const save = (state: State): void => {
  window.localStorage.setItem(keyOfLapInfoListText, state.lapInfoListText)
}

export const load = (): State => ({
  lapInfoListText:
    window.localStorage.getItem(keyOfLapInfoListText) || defaultLapInfoListText,
})
