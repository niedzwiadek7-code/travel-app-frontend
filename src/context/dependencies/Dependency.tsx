import React, {
  createContext, ReactNode, useContext, useMemo,
} from 'react'
import Backend from '../../services/backend'
import { DependencyInterface } from './DependencyInterface'

export class Dependency {
  getApiService() {
    return new Backend()
  }
}

export const DependenciesContext = createContext<DependencyInterface>(new Dependency())

type Props = {
  children: ReactNode
}

export const DependenciesProvider: React.FC<Props> = (props) => {
  const value = useMemo(() => new Dependency(), [])

  return (
    <DependenciesContext.Provider
      value={value}
    >
      { props.children }
    </DependenciesContext.Provider>
  )
}

export const useDependencies = () => useContext(DependenciesContext)
