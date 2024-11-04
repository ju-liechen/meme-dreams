import ErrorBoundary from 'components/error-boundary'
import { Notification } from 'components/notification/'
import { TemporaryNav } from 'components/temporary-nav'
import { SvgDefs } from 'components/svg-defs'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <TemporaryNav />
      <Notification />
      <ErrorBoundary>{children}</ErrorBoundary>
      <SvgDefs />
    </>
  )
}
