import { Agenda } from './type'
import Papa from 'papaparse'

const headerText = 'label,second\n'
const parseErrorPrefix = 'Parse Error: '

export const parseTextToAgendaList = (text: string): Agenda[] => {
  const { data, errors } = Papa.parse(headerText + text, {
    header: true,
    skipEmptyLines: true,
  })
  return errors.length > 0
    ? errors.map(({ message }) => ({
        label: parseErrorPrefix + message,
        second: 0,
      }))
    : data.map(({ label, second }) => ({
        label,
        second: Number.isNaN(Number(second)) ? 0 : Number(second),
      }))
}

interface TimerLabel {
  hour: string
  minute: string
  second: string
}

const zeroPad2 = (x: number) => String(x).padStart(2, '0')

export const calcTimerLabelFromRemainSecond = (
  remainSecond: number,
): TimerLabel => {
  const remainSecondAbs = Math.abs(remainSecond)
  const remainMinute = remainSecondAbs / 60
  const remainHour = remainMinute / 60
  return {
    second: zeroPad2(Math.round(remainSecondAbs % 60)), // NOTE: 58.999 => 59 not 58
    minute: zeroPad2(Math.floor(remainMinute % 60)),
    hour: zeroPad2(Math.floor(remainHour)),
  }
}
