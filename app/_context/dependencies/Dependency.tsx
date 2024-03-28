import React, {
  createContext, ReactNode, useContext, useMemo,
} from 'react'
import { ToastContainer } from 'react-toastify'
import Backend from '@/app/_services/backend'
import { DependencyInterface } from './DependencyInterface'
import { Toast } from '@/app/_utils/Toast'

// TODO: should be split into separate context

export class Dependency {
  getApiService() {
    return new Backend()
  }

  getToastUtils() {
    return new Toast()
  }
}

export const DependenciesContext = createContext<DependencyInterface>(new Dependency())

type Props = {
  children: ReactNode
}

export default function DependenciesProvider(props: Props) {
  const value = useMemo(() => new Dependency(), [])

  return (
    <DependenciesContext.Provider
      value={value}
    >
      { props.children }

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </DependenciesContext.Provider>
  )
}

export const useDependencies = () => useContext(DependenciesContext)
