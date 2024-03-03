import React, {
  createContext, ReactNode, useContext, useMemo,
} from 'react'
// @ts-ignore
import { ConsoleLogger as ConsoleLoggerComponent } from 'react-console-log'
import { LogInterface } from './LogInterface'
import { LoggerInterface, ConsoleLogger } from '../../utils/Logger'

class Log implements LogInterface {
  logger: LoggerInterface

  constructor() {
    this.logger = new ConsoleLogger()
  }
}

const LogContext = createContext<LogInterface>(new Log())

type ProviderProps = {
  children: ReactNode
}

export const LogProvider: React.FC<ProviderProps> = (props) => {
  const value = useMemo(() => new Log(), [])

  return (
    <LogContext.Provider value={value}>
      {props.children}
      <ConsoleLoggerComponent
        logger={value.logger}
      />
    </LogContext.Provider>
  )
}

export const useLog = () => useContext(LogContext)
