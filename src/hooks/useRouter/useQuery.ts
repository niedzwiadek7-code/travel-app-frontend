import { useMemo } from 'react'

const useQuery = <T>(queryStr: string): T => useMemo(
  () => {
    const urlSearchParams = new URLSearchParams(queryStr)
    return Object.fromEntries(urlSearchParams) as T
  },
  [queryStr],
)

export default useQuery
