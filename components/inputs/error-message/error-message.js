import { classnames } from 'util/classnames'
import styles from './error-message.module.scss'

export const ErrorMessage = ({ children, className, ...props }) => (
  <div className={classnames([styles['error-message'], className])} {...props}>
    {children}
  </div>
)
