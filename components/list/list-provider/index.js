import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'

const ListContext = createContext(null)

export const useListContext = () =>
  useContext(ListContext)

export const ListProvider = ({children, ...props}) => {
  const isReady = useIsReady()
  if (!isReady) return null

  return <ListContext.Provider value={props}>
    {children}
  </ListContext.Provider>
}

// NextJs server-side isReady can be false while client-side is true, leading to
// hydration issues. This is a hacky workaround
const useIsReady = () => {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      setIsReady(true)
    }
  }, [router.isReady])

  return isReady
}
