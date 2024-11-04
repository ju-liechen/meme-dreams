import { classnames } from 'util/classnames'
import styles from './form-message.module.scss'
import { Icon } from 'components/icon'

export const FormMessage = ({ variant, children }) => {
  const iconNames = {
    success: 'check',
    error: 'x',
  }

  const iconName = iconNames[variant]
  const iconClass = variant === 'error' ? 'not-filled' : 'filled'

  return (
    <div
      className={classnames(styles['form-message'], variant && styles[variant])}
    >
      {iconName ? (
        <div className={styles.icon}>
          <Icon name={iconName} className={iconClass} />
        </div>
      ) : null}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
