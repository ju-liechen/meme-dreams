import Link from 'next/link'

import styles from './navigation.module.scss'

export const Navigation = () => {
  return (
    <div className={styles['nav-wrapper']}>
      <Link href="/"><img src="images/logo.png" alt="Meme Dreams" width={60}></img></Link>
      <Link href="/"><h1>Meme Dreams</h1></Link>
      <Link href="/about"><span>About</span></Link>
    </div>
  )
}