import ErrorBoundary from 'components/error-boundary'
import { Modals } from 'components/modal'
import { UploadImage } from 'components/modal/upload-image'
import { Navigation } from 'components/navigation'
import { Notification } from 'components/notification/'
import { SvgDefs } from 'components/svg-defs'

import styles from './base-layout.module.scss'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <Modals modals={{ UploadImage }}/>
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
