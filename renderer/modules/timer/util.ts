import { Agenda } from './type'

export const parseTextToAgendaList = (text: string): Agenda[] =>
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
