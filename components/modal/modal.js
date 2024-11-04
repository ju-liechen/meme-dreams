import {classnames} from 'util/classnames'
import styles from './modal.module.scss'

export const Modal = ({
  open,
  close,
  closeOnClickBackdrop = true,
  className,
  hideClose = false,
  children,
  ...props
}) =>
  <div
    onClick={ev => {
      if (!closeOnClickBackdrop) return
      if (ev.target.classList.contains(styles['modal-backdrop'])) {
        close()
      }
    }}
    className={classnames(
      styles['modal-backdrop'],
      'modal', // global class used for closing modals in use-modal
      className
    )}
    {...props}
  >
    <div className={classnames(styles.modal, !hideClose && styles['has-close'])}> 
      {!hideClose && <button className={styles.close} onClick={() => close()} />}
      {children}
    </div>
  </div>
