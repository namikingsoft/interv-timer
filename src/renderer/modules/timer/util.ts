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

export const roundSecond = Math.round

export const calcTimerLabelFromRemainSecond = (
  remainSecond: number,
): TimerLabel => {
  const remainSecondAbs = Math.abs(remainSecond)
  const roundedSecond = roundSecond(remainSecondAbs) // NOTE: 58.999 => 59 not 58
  const remainMinute = Math.floor(roundedSecond / 60)
  const remainHour = Math.floor(remainMinute / 60)
  return {
    second: zeroPad2(roundedSecond % 60),
    minute: zeroPad2(remainMinute % 60),
    hour: zeroPad2(remainHour),
  }
}
