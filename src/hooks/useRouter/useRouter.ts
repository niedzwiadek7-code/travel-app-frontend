import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '.'
import { useAuth } from '../../context'

// TODO: Should move to src/context ?
// Should handle redirects from page?
// Maybe should be global hoc for every page?
// This may make a unit test easier
// TODO: think about move here some dependencies
// TODO: make globally navigate

interface RouterHookResult<
  State = Record<string, any>,
  Query = Record<string, any>,
  Params = Record<string, any>,
> {
  state: State
  query: Query
  params: Params
  navigate: ReturnType<typeof useNavigate>,
  token: string | undefined,
  pathname: string
}

const useRouter = <State, Query, Params>(): RouterHookResult<State, Query, Params> => {
  const { state, search, pathname } = useLocation()
  const navigate = useNavigate()
  const params = useParams() as Params
  const query = useQuery<Query>(search)
  const { token } = useAuth()

  return {
    params,
    state,
    query,
    navigate,
    token,
    pathname,
  }
}

export default useRouter
