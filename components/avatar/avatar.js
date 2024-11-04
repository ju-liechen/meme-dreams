import styles from './style.module.scss'
import PropTypes from 'prop-types'

export const Avatar = ({
  src,
  firstName = '',
  lastName = '',
  className = '',
  size = '100',
}) => (
  <div
    style={{ fontSize: `${size}%` }}
    className={`${styles.avatarWrap} ${className}`}
  >
    <div className={`${styles.avatar} ${src && 'hasImage'}`}>
      {src ? (
        <img src={src} alt={firstName} />
      ) : (
        <div className={styles.initial}>{firstName[0]}</div>
      )}
    </div>
  </div>
)

Avatar.propTypes = {
  src: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
}
