import React from 'react'

interface LapInfo {
  label: string
  second: number
}

interface HookReturnType {
  save(text: string): void
  load(): string
  loadLapInfoList(): LapInfo[]
}

const localStorageKey = 'LapInfoListText'

const defaultText = 'label1,60\nlabel2,180'

export const useLapInfoRepository = (): HookReturnType => {
  const save = React.useCallback((text: string) => {
    window.localStorage.setItem(localStorageKey, text)
  }, [])

  const load = React.useCallback(
    (): string => window.localStorage.getItem(localStorageKey) || defaultText,
    [],
  )

  const loadLapInfoList = React.useCallback(
    (): LapInfo[] =>
      load()
        .split(/\r?\n/)
        .filter((x) => !!x)
        .map((line) => {
          const [label, second] = line.split(',')
          return {
            label,
            second: Number.isNaN(second) ? 0 : Number(second),
          }
        }),
    [],
  )

  return { save, load, loadLapInfoList }
}
