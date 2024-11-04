import styles from './page.module.scss'

export const PageLoader = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        {text ? <p className={styles.text}>{text}</p> : null}
      </div>
    </div>
  )
}
