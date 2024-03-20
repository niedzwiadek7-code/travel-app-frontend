import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '.'

// TODO: Should move to src/context ?
// Should handle redirects from page?
// Maybe should be global hoc for every page?
// This may make a unit test easier

interface RouterHookResult<
  State = Record<string, any>,
  Query = Record<string, any>,
  Params = Record<string, any>,
> {
  state: State
  query: Query
  params: Params
  navigate: ReturnType<typeof useNavigate>
}

const useRouter = <State, Query, Params>(): RouterHookResult<State, Query, Params> => {
  const { state, search } = useLocation()
  const navigate = useNavigate()
  const params = useParams() as Params
  const query = useQuery<Query>(search)

  return {
    params,
    state,
    query,
    navigate,
  }
}

export default useRouter
