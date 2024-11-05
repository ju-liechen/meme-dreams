import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Icon } from 'components/icon'

import { classnames } from 'util/classnames'
import { useStore } from 'util/store'

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
  }, [duration, text, type])

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className={classnames([styles.wrapper, styles[type]])}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className={classnames([styles.wrapper, styles[type]])}>
            <div className={styles['body-wrapper']}>
              {type === 'error' && (
                <Icon name="error-warning" className={styles['icon']} />
              )}
              {type === 'success' && (
                <Icon
                  name="success"
                  className={classnames([styles['icon'], styles['success']])}
                />
              )}
              <div className={styles['text']}>{text}</div>
            </div>

            <button
              className={styles['icon-btn']}
              onClick={() => setNotification({})}
            >
              <Icon name="x" className={styles['close-icon']} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}