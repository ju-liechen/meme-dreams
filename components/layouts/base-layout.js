import ErrorBoundary from 'components/error-boundary'
import { Navigation } from 'components/navigation'
import { Notification } from 'components/notification/'
import { SvgDefs } from 'components/svg-defs'

import styles from './base-layout.module.scss'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <div className={styles['base-container']}>
        <Notification />
        <Navigation />
        <div className={styles['body']}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
        <SvgDefs />
      </div>
    </>
  )
}
