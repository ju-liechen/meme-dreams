import { forwardRef } from 'react'
import { classnames } from 'util/classnames'
import { ErrorMessage } from 'components/inputs/error-message'
import styles from './textarea.module.scss'

export const Textarea = forwardRef(
  (
    { name, value, label, placeholder, error = false, id, rows = 4, ...props },
    ref,
  ) => {
    id = id || name
    return (
      <>
        <div
          className={classnames([
            styles['input-component'],
            error && styles['error'],
          ])}
        >
          {label && <label htmlFor={id}>{label}</label>}
          <textarea
            rows={rows}
            name={name}
            value={value}
            autoComplete="off"
            placeholder={placeholder}
            id={id}
            ref={ref}
            {...props}
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    )
  },
)

Textarea.displayName = 'Textarea'
