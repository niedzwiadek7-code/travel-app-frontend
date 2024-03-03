/* eslint-disable no-unused-vars */

export interface LoggerInterface {
  log(message: string): void
  fatal(message: string): void
  error(message: string): void
  warn(message: string): void
  debug(message: string): void
  verbose(message: string): void
}
