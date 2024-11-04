import Link from 'next/link'
import { useIsLoggedIn } from 'hooks/use-is-logged-in'
import styles from './header.module.scss'

export const Header = () => {
  const isLoggedIn = useIsLoggedIn()
  return <header className={styles.header}>
    <h3><Link href='/demo'>Starter</Link></h3>
    <div>
      {isLoggedIn === true && <Link href='/demo/account'>Account</Link>}
      {isLoggedIn === false && <>
        <Link href='/demo/login'>Login</Link>
        <Link href='/demo/signup'>Signup</Link>
      </>}
    </div>
  </header>
}
