import { classnames } from 'util/classnames'

import styles from './inline.module.scss'

export const InlineLoader = ({ className, style, ...props }) => {
  return <div className={classnames([styles.loader, className])} {...props} />
}
