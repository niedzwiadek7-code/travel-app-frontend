import dayjs from 'dayjs'
import { DateHandler } from '.'

describe('Date Utils', () => {
  beforeAll(() => {
    process.env.TZ = 'UTC'
  })

  it('should compare dates', () => {
    expect(
      DateHandler.compareDates('2020-03-04', '2021-01-01'),
    ).toBe(-1)
    expect(
      DateHandler.compareDates('2020-01-03', '2020-01-02'),
    ).toBe(1)
    expect(
      DateHandler.compareDates('2021-01-01', '2021-01-01'),
    ).toBe(0)

    expect(
      DateHandler.compareDates(new Date('2020-03-04'), new Date('2021-01-01')),
    ).toBe(-1)
    expect(
      DateHandler.compareDates(new Date('2020-01-03'), new Date('2020-01-02')),
    ).toBe(1)
    expect(
      DateHandler.compareDates(new Date('2020-01-02'), new Date('2020-01-02')),
    ).toBe(0)

    expect(
      DateHandler.compareDates(dayjs(), dayjs().add(1, 'day')),
    ).toBe(-1)
    expect(
      DateHandler.compareDates(dayjs().add(1, 'day'), dayjs()),
    ).toBe(1)
    expect(
      DateHandler.compareDates(dayjs().add(1, 'day'), dayjs().add(1, 'day')),
    ).toBe(0)
  })

  it('should add and substract dates', () => {
    const dateHandler = new DateHandler('2020-01-01')

    dateHandler.add(1, 'day')
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2020-01-02')

    dateHandler.add(1, 'month')
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2020-02-02')

    dateHandler.add(1, 'year')
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2021-02-02')

    dateHandler.subtract(1, 'day')
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2021-02-01')

    dateHandler.subtract(1, 'month')
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2021-01-01')

    dateHandler.subtract(1, 'year')
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2020-01-01')
  })

  it('should add and subtract hours', () => {
    const dateHandler = new DateHandler('21:37')

    dateHandler.add(1, 'hour')
    expect(dateHandler.format('HH:mm')).toBe('22:37')

    dateHandler.add(1, 'minute')
    expect(dateHandler.format('HH:mm')).toBe('22:38')

    dateHandler.subtract(1, 'hour')
    expect(dateHandler.format('HH:mm')).toBe('21:38')

    dateHandler.subtract(1, 'minute')
    expect(dateHandler.format('HH:mm')).toBe('21:37')
  })

  it('should format date', () => {
    const dateHandler = new DateHandler('2020-01-01')
    expect(
      dateHandler.format('YYYY-MM-DD'),
    ).toBe('2020-01-01')
    expect(
      dateHandler.toISOString(),
    ).toBe('2020-01-01T00:00:00.000Z')

    const dateHandler2 = new DateHandler('2020-01-01 21:37')
    expect(
      dateHandler2.format('YYYY-MM-DD HH:mm'),
    ).toBe('2020-01-01 21:37')
    expect(
      dateHandler2.toISOString(),
    ).toBe('2020-01-01T21:37:00.000Z')
  })

  it('Should set date', () => {
    const dateHandler = new DateHandler('2020-01-01')
    dateHandler.set('year', 2021)
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2021-01-01')

    dateHandler.set('month', 2)
    expect(dateHandler.format('YYYY-MM-DD')).toBe('2021-03-01')
  })

  it('Should get date', () => {
    const dateHandler = new DateHandler('2020-01-01 21:37:00')
    expect(dateHandler.get('year')).toBe(2020)
    expect(dateHandler.get('month')).toBe(0)
    expect(dateHandler.get('date')).toBe(1)
    expect(dateHandler.get('hour')).toBe(21)
    expect(dateHandler.get('minute')).toBe(37)
    expect(dateHandler.get('second')).toBe(0)
  })
})
