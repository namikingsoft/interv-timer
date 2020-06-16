import { LapInfo } from './type'

export const parseTextToLapInfoList = (text: string): LapInfo[] =>
  text
    .split(/\r?\n/)
    .filter((x) => !!x)
    .map((line) => {
      const [label, second] = line.split(',')
      return {
        label,
        second: Number.isNaN(second) ? 0 : Number(second),
      }
    })
