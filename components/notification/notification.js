import { useEffect } from 'react'
import { useStore } from 'util/store'
import { classnames } from 'util/classnames'

import styles from './notification.module.scss'

export const Notification = () => {
  const notification = useStore((state) => state.notification)
  const setNotification = useStore((state) => state.setNotification)
  const { type = 'success', text = '', duration = 3000 } = notification

  useEffect(() => {
    const removeNotification = setTimeout(() => {
      setNotification({})
    }, duration)

    return () => {
      clearTimeout(removeNotification)
    }
  })

  return notification ? (
    <div className={classnames([styles.wrapper, styles[type]])}>
      <div className={classnames(['container', styles.container])}>{text}</div>
    </div>
  ) : null
}
