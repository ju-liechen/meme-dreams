import React from 'react'
import { Button } from 'components/button'
import { classnames } from 'util/classnames'

import styles from './error-boundary.module.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.wrapper}>
          <div className={classnames(['container'])}>
            <h2 className={styles.title}>Oops, there was an error!</h2>
            <p className={styles.caption}>
              Check the console for more information.
              <br />
              If you would like to report this error, please visit the support
              page. If you are able, copy the error message in the console /
              take a screenshot / describe the issue in detail so we can fix it
              as soon as possible.
            </p>
            <div className={styles.actions}>
              <Button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className={styles.button}
              >
                Try again?
              </Button>
              <Button
                className={styles.button}
                variation="secondary"
                href="/contact"
              >
                Support page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
