import { parseTextToAgendaList, calcTimerLabelFromRemainSecond } from './util'

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
          label:
            "Parse Error: Unable to auto-detect delimiting character; defaulted to ','",
          second: 0,
        },
        {
          label: 'Parse Error: Too few fields: expected 2 fields but parsed 1',
          second: 0,
        },
      ])
      expect(parseTextToAgendaList('label,60\nlabelonly')).toEqual([
        {
          label:
            "Parse Error: Unable to auto-detect delimiting character; defaulted to ','",
          second: 0,
        },
        {
          label: 'Parse Error: Too few fields: expected 2 fields but parsed 1',
          second: 0,
        },
      ])
    })
  })

  describe('calcTimerLabelFromRemainSecond', () => {
    it('should return label of hour and minute and second by remain second', () => {
      expect(calcTimerLabelFromRemainSecond(0)).toEqual({
        hour: '00',
        minute: '00',
        second: '00',
      })

      expect(calcTimerLabelFromRemainSecond(1)).toEqual({
        hour: '00',
        minute: '00',
        second: '01',
      })

      expect(calcTimerLabelFromRemainSecond(59)).toEqual({
        hour: '00',
        minute: '00',
        second: '59',
      })

      expect(calcTimerLabelFromRemainSecond(60)).toEqual({
        hour: '00',
        minute: '01',
        second: '00',
      })

      expect(calcTimerLabelFromRemainSecond(61)).toEqual({
        hour: '00',
        minute: '01',
        second: '01',
      })

      expect(calcTimerLabelFromRemainSecond(60 * 60 - 1)).toEqual({
        hour: '00',
        minute: '59',
        second: '59',
      })

      expect(calcTimerLabelFromRemainSecond(60 * 60 + 61)).toEqual({
        hour: '01',
        minute: '01',
        second: '01',
      })
    })

    it('should round second', () => {
      expect(calcTimerLabelFromRemainSecond(60.1)).toEqual({
        hour: '00',
        minute: '01',
        second: '00',
      })
      expect(calcTimerLabelFromRemainSecond(59.9)).toEqual({
        hour: '00',
        minute: '01',
        second: '00',
      })
      expect(calcTimerLabelFromRemainSecond(59.1)).toEqual({
        hour: '00',
        minute: '00',
        second: '59',
      })
      expect(calcTimerLabelFromRemainSecond(58.9)).toEqual({
        hour: '00',
        minute: '00',
        second: '59',
      })
    })

    it('should return hour label over 60', () => {
      expect(calcTimerLabelFromRemainSecond(60 * 60 * 60)).toEqual({
        hour: '60',
        minute: '00',
        second: '00',
      })

      expect(calcTimerLabelFromRemainSecond(60 * 60 * 61)).toEqual({
        hour: '61',
        minute: '00',
        second: '00',
      })
    })

    it('should return absolute label from minus remain second', () => {
      expect(calcTimerLabelFromRemainSecond(-1)).toEqual({
        hour: '00',
        minute: '00',
        second: '01',
      })

      expect(calcTimerLabelFromRemainSecond(-(60 * 60 + 61))).toEqual({
        hour: '01',
        minute: '01',
        second: '01',
      })

      expect(calcTimerLabelFromRemainSecond(-(60 * 60 * 61))).toEqual({
        hour: '61',
        minute: '00',
        second: '00',
      })
    })
  })
})
