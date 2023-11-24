import dayjs from 'dayjs'

class Date {
  hour: number

  minute: number

  constructor(dateStr: string) {
    const date = dayjs(dateStr)
    this.hour = date.hour()
    this.minute = date.minute()
  }

  static compareDates(date1: Date, date2: Date) {
    if (date1.hour > date2.hour) {
      return 1
    }

    if (date1.hour < date2.hour) {
      return -1
    }

    return date1.minute > date2.minute ? 1 : -1
  }

  static timeDiff(date1: Date, date2: Date) {
    if (date1.minute >= date2.minute) {
      return date2.hour - date1.hour
    }
    return date2.hour - date1.hour + 1
  }

  toString() {
    const hour = this.hour > 10 ? `${this.hour}` : `0${this.hour}`
    const minute = this.minute > 10 ? `${this.minute}` : `0${this.minute}`
    return `${hour}:${minute}`
  }
}

export default Date
