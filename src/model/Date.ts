import dayjs from 'dayjs'

class Date {
  hour: number

  minute: number

  constructor(dateStr: string) {
    const date = dayjs(dateStr)
    this.hour = date.hour()
    this.minute = date.minute()
  }

  compareDates(date1Str: string, date2Str: string) {
    const date1 = dayjs(date1Str)
    const date2 = dayjs(date2Str)

    const diff = date1.diff(date2)

    if (diff > 0) {
      return 1
    }

    if (diff < 0) {
      return -1
    }

    return 0
  }

  toString() {
    const hour = this.hour > 10 ? `${this.hour}` : `0${this.hour}`
    const minute = this.minute > 10 ? `${this.minute}` : `0${this.minute}`
    return `${hour}:${minute}`
  }
}

export default Date
