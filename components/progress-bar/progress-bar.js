import { Root, Indicator } from '@radix-ui/react-progress'

import styles from './progress-bar.module.scss'

export const Progress = ({ progress = 0, displayText = 'Uploading' }) => {
  return (
    <Root className={styles.root} value={progress} max={100}>
      <Indicator
        className={styles.indicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
      <span>{displayText}</span>
    </Root>
  )
}
