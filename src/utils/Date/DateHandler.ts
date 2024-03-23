import dayjs, { Dayjs, ManipulateType, UnitType } from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { DateType } from './types'

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
dayjs.extend(timezone)

export class DateHandler {
  private currentDate: Dayjs

  constructor(date: DateType = new Date()) {
    this.currentDate = dayjs.utc(date)

    if (!this.currentDate.isValid()) {
      const dateStr = `01-01-1970 ${date}`
      this.currentDate = dayjs(dateStr)
    }
  }

  static compareDates(
    date1: DateType,
    date2: DateType,
  ) {
    const date1Obj = new DateHandler(date1).toISOString()
    const date2Obj = new DateHandler(date2).toISOString()
    return DateHandler.diff(date2Obj, date1Obj, 'milliseconds')
  }

  static diff(
    date1: DateType,
    date2: DateType,
    unit: UnitType,
  ) {
    const date1Obj = new DateHandler(date1).toISOString()
    const date2Obj = new DateHandler(date2).toISOString()
    return dayjs(date1Obj).diff(dayjs(date2Obj), unit)
  }

  add(count: number, unit: ManipulateType) {
    this.currentDate = this.currentDate.add(count, unit)
    return this
  }

  subtract(count: number, unit: ManipulateType) {
    this.currentDate = this.currentDate.subtract(count, unit)
    return this
  }

  set(unit: UnitType, value: number) {
    this.currentDate = this.currentDate.set(unit, value)
    return this
  }

  get(unit: UnitType) {
    return this.currentDate.get(unit)
  }

  format(mask: string) {
    return this.currentDate.format(mask)
  }

  toISOString() {
    return this.currentDate.toISOString()
  }
}
