import { useState, useEffect, useRef } from 'react'
import {
  Root,
  Trigger as RadixTrigger,
  Anchor,
  Content,
  Portal,
} from '@radix-ui/react-popover'
import { Icon } from '/components/icon'
import { classnames } from 'util/classnames'

import styles from './popover.module.scss'

export const Popover = ({
  trigger,
  children,
  side = 'right',
  align = 'start',
  onInteractOutside,
  triggerClose,
  className,
  externalOpenState,
  hideTrigger,
}) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef()

  useEffect(() => {
    if (!triggerClose) return
    setOpen(false)
  }, [triggerClose])

  useEffect(() => {
    if (typeof externalOpenState === 'undefined') return
    setOpen(externalOpenState)
  }, [externalOpenState])

  return (
    <Root open={open}>
      <Anchor />
      {!hideTrigger ? (
      <RadixTrigger asChild>
        <>
          {trigger ? (
            <div
              className={styles['custom-trigger']}
              ref={triggerRef}
              role="button"
              onClick={() => setOpen(!open)}
            >
              {trigger}
            </div>
          ) : (
            <button
              className={classnames([styles.trigger, 'button-reset'])}
              onClick={() => setOpen(!open)}
              type="button"
              ref={triggerRef}
            >
              <span className="visually-hidden">Open popover</span>
              <Icon name="dots" className={styles['trigger-icon']} />
            </button>
          )}
        </>
      </RadixTrigger>
      ) : null}
      <Content
        onInteractOutside={() => {
          typeof onInteractOutside === 'function' && onInteractOutside()
          setOpen(false)
        }}
        className={classnames([styles.content, className])}
        side={side}
        align={align}
      >
        {children}
      </Content>
    </Root>
  )
}
