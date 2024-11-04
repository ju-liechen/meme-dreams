import { forwardRef, useState, useRef, useEffect } from 'react'
import { Icon } from 'components/icon'
import { ErrorMessage } from 'components/inputs/error-message'
import { classnames } from 'util/classnames'

import styles from './select.module.scss'

import {
  Root,
  Trigger,
  Value,
  Content,
  Viewport,
  Item,
  ItemText,
  Portal,
} from '@radix-ui/react-select'

export const SelectInput = forwardRef(
  (
    {
      id,
      name,
      label,
      placeholder,
      defaultValue,
      error,
      options = [{}],
      required,
      ...props
    },
    ref
  ) => {
    const [contentWidth, setContentWidth] = useState(500)
    const containerRef = useRef()

    useEffect(() => {
      if (!containerRef?.current) return
      const refRect = containerRef.current.getBoundingClientRect()
      const width = refRect.width
      setContentWidth(width)
    }, [containerRef])

    return (
      <div
        ref={containerRef}
        className={classnames([
          styles['select-input-component'],
          error ? styles.error : null,
        ])}
      >
        <Root
          defaultValue={defaultValue}
          name={name}
          required={required}
          {...props}
        >
          {label && (
            <label className={styles['select-label']} id={id}>
              {label}
            </label>
          )}
          <Trigger className={styles['select-trigger']} aria-label={label}>
            <Value placeholder={placeholder} />
            <div className={styles['select-arrow']}>
              <Icon name="chevron-down" />
            </div>
          </Trigger>
          <Portal>
            <Content
              className={styles['select-content']}
              position="popper"
              style={{ width: `${contentWidth}px` }}
            >
              <Viewport className="select-viewport">
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </Viewport>
            </Content>
          </Portal>
        </Root>
        {error && (
          <ErrorMessage className={styles['error-message']}>
            {error}
          </ErrorMessage>
        )}
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'

const SelectItem = forwardRef(function SelectItem(
  { children, ...props },
  forwardedRef
) {
  return (
    <Item className={styles['select-item']} {...props} ref={forwardedRef}>
      <ItemText>{children}</ItemText>
    </Item>
  )
})

SelectItem.displayName = 'SelectItem'
