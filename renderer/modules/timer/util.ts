import { Agenda } from './type'
import Papa from 'papaparse'

const headerText = 'label,second\n'

export const parseTextToAgendaList = (text: string): Agenda[] => {
  const { data, errors } = Papa.parse(headerText + text, {
    header: true,
    skipEmptyLines: true,
  })
  return errors.length > 0
    ? errors.map(({ message }) => ({ label: message, second: 0 }))
    : data.map(({ label, second }) => ({
        label,
        second: Number.isNaN(Number(second)) ? 0 : Number(second),
      }))
}
