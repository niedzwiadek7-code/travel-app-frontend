import React, {
  createContext, ReactNode, useContext, useMemo,
} from 'react'
import Backend from '../../services/backend'
import { DependencyInterface } from './DependencyInterface'
import { Toast, Types } from '../../utils/Toast'

// TODO: should be split into separate context

export class Dependency {
  getApiService() {
    return new Backend()
  }

  getToastUtils() {
    const toast = new Toast()
    return {
      Toast: toast,
      types: Types.Type,
    }
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
