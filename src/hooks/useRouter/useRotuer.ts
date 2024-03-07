import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '.'

// Should move to src/context ?
// Should handle redirects from page?
// Maybe should be global hoc for every page?
// This may make a unit test easier

interface RouterHookResult<
  State = Record<string, any>,
  Query = Record<string, any>
> {
  state: State
  query: Query
  navigate: ReturnType<typeof useNavigate>
}

const useRouter = <State, Query>(): RouterHookResult<State, Query> => {
  const { state, search } = useLocation()
  const navigate = useNavigate()
  const query = useQuery<Query>(search)

  return {
    state,
    query,
    navigate,
  }
}

export default useRouter
