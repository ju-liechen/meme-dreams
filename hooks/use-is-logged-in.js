import { useQuery } from 'hooks/use-query'

const fiveMinutes = 1000 * 60 * 5

export const useIsLoggedIn = () => {
  const {data} = useQuery({
    url: '/public/user/is-logged-in',
    staleTime: fiveMinutes,
    cacheTime: fiveMinutes
  })
  return data?.isLoggedIn
}
