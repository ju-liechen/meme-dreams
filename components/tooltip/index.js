import React, { forwardRef } from 'react'
import * as ToolTip from '@radix-ui/react-tooltip'

import styles from './tooltip.module.scss'

export const Tooltip = forwardRef(({ children, label, position }, ref) => {
  return (
    <ToolTip.Provider>
      <ToolTip.Root>
        <ToolTip.Trigger asChild ref={ref}>
          {children}
        </ToolTip.Trigger>
        <ToolTip.Portal>
          <ToolTip.Content
            className={styles['tooltip-content']}
            side={position}
            sideOffset={5}
          >
            {label}
            <ToolTip.Arrow className={styles['tooltip-arrow']} />
          </ToolTip.Content>
        </ToolTip.Portal>
      </ToolTip.Root>
    </ToolTip.Provider>
  )
})