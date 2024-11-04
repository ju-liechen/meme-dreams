import {Header} from 'components/demo/header'
import styles from './layout.module.scss'

export const DemoLayout = ({children}) =>
  <div className={styles.layout}>
    <Header />
    <main>
      {children}
    </main>
  </div>
