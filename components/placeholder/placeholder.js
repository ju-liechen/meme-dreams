import styles from './placeholder.module.scss'

export const Placeholder = ({ name }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>{name}</div>
  </div>
)
