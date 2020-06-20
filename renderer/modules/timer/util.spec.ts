import { parseTextToAgendaList } from './util'

describe('modules/timer/util', () => {
  describe('parseTextToAgendaList', () => {
    it('should parse csv', () => {
      const agendaListText = '\nAgenda 1,"60"\r\n"Agenda 2",180\n\n, 120  \n\n'
      expect(parseTextToAgendaList(agendaListText)).toEqual([
        { label: 'Agenda 1', second: 60 },
        { label: 'Agenda 2', second: 180 },
        { label: '', second: 120 },
      ])
      expect(parseTextToAgendaList('')).toEqual([])
    })

    it('should trans 0 if second is NaN', () => {
      const agendaListText = 'Agenda1,a\r\nAgenda2,180'
      expect(parseTextToAgendaList(agendaListText)).toEqual([
        { label: 'Agenda1', second: 0 },
        { label: 'Agenda2', second: 180 },
      ])
    })

    it('should return error message on label', () => {
      expect(parseTextToAgendaList('labelonly')).toEqual([
        {
          label: "Unable to auto-detect delimiting character; defaulted to ','",
          second: 0,
        },
        {
          label: 'Too few fields: expected 2 fields but parsed 1',
          second: 0,
        },
      ])
      expect(parseTextToAgendaList('label,60\nlabelonly')).toEqual([
        {
          label: "Unable to auto-detect delimiting character; defaulted to ','",
          second: 0,
        },
        {
          label: 'Too few fields: expected 2 fields but parsed 1',
          second: 0,
        },
      ])
    })
  })
})
