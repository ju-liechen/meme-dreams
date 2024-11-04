import Link from 'next/link'

import styles from './demo.module.scss'

export const DemoPage = () => {
  return <div>
    <h2>Demo</h2>
    <div className={styles.links} >
      <Link href='/demo/modals'>Modals</Link>
      <Link href='/demo/sentry'>Sentry Error Handling</Link>
    </div>
  </div>
}

DemoPage.Layouts = ['DemoLayout']
export default DemoPage
