// @ts-ignore
import { Logger } from 'react-console-log'
import { LoggerInterface } from './LoggerInterface'

class ConsoleLogger implements LoggerInterface {
  private logger: typeof Logger

  constructor() {
    this.logger = new Logger()
  }

  log(message: string): void {
    this.logger.log(message)
  }

  error(message: string): void {
    this.logger.error(message)
  }

  fatal(message: string): void {
    this.logger.fatal(message)
  }

  warn(message: string): void {
    this.logger.warn(message)
  }

  debug(message: string): void {
    this.logger.debug(message)
  }

  verbose(message: string): void {
    this.logger.info(message)
  }
}

export default ConsoleLogger
