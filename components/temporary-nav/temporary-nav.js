import Link from 'next/link'
import { LogoutForm } from 'components/forms/logout'
import { useStore } from 'util/store'
import { useQuery } from 'hooks/use-query'

export const TemporaryNav = () => {
  const setModal = useStore((state) => state.setModal)
  const {data, isSuccess} = useQuery({url: '/public/user/is-logged-in'})
  const isLoggedIn = data?.isLoggedIn

  return (
    <nav>
      <ul>
        <li>
          <Link href="/stylesheet">Stylesheet</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/dashboard">Authed area</Link> |{' '}
            </li>
            <li>
              <LogoutForm submitButton={{variation: 'text'}} onSuccess={() => window.location.href = '/' } />
            </li>
          </>
        ) : null}
        {(!isLoggedIn && isSuccess) ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <button
                className="button-reset"
                onClick={() => setModal('SignupModal')}
              >
                Signup
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  )
}
