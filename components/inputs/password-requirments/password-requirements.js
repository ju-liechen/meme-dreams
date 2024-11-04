import { Icon } from 'components/icon'
import { classnames } from 'util/classnames'
import styles from './password-requirements.module.scss'

export const PasswordRequirements = ({
  isLongEnough,
  hasUpperCase,
  hasSpecial,
}) => (
  <div className={styles['password-requirements']}>
    <p
      className={classnames([
        isLongEnough && styles.success,
        styles.requirement,
      ])}
    >
      {isLongEnough ? (
        <Icon name="check" className="filled" />
      ) : (
        <Icon name="circle" className="filled" />
      )}
      Minimum 8 characters
    </p>
    <p
      className={classnames([
        hasUpperCase && styles.success,
        styles.requirement,
      ])}
    >
      {hasUpperCase ? (
        <Icon name="check" className="filled" />
      ) : (
        <Icon name="circle" className="filled" />
      )}
      1 capital letter
    </p>
    <p
      className={classnames([hasSpecial && styles.success, styles.requirement])}
    >
      {hasSpecial ? (
        <Icon name="check" className="filled" />
      ) : (
        <Icon name="circle" className="filled" />
      )}
      1 special character (!@#$%&*?-)
    </p>
  </div>
)
