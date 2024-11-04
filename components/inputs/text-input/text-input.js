import { forwardRef, useState } from 'react'
import { Icon } from 'components/icon'
import { classnames } from 'util/classnames'
import { ErrorMessage } from 'components/inputs/error-message'
import styles from './text-input.module.scss'

export const TextInput = forwardRef(
  (
    {
      type = 'text',
      name,
      value,
      label,
      hideLabel = false,
      placeholder,
      error = false,
      icon,
      id,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [showPass, setShowPass] = useState(false)
    id = id || name
    return (
      <>
        <div
          className={classnames([
            styles['input-component'],
            error && styles['error'],
            className,
          ])}
          style={style}
        >
          {label && (
            <label
              htmlFor={id}
              className={classnames([hideLabel ? 'visually-hidden' : null])}
            >
              {label}
            </label>
          )}
          {name === 'cost' && <span className="currency-symbol">$</span>}
          <input
            type={type === 'password' ? (showPass ? 'text' : 'password') : type}
            name={name}
            value={value}
            autoComplete="off"
            placeholder={placeholder}
            id={id}
            ref={ref}
            className={classnames([
              hideLabel ? styles['no-label'] : null,
              icon ? styles['has-icon'] : null,
            ])}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={styles['toggle-pass']}
            >
              <Icon name={showPass ? 'eye-cross' : 'eye'} />
            </button>
          )}
          {icon ? <Icon name={icon} className={styles.icon} /> : null}
          {error && (
            <ErrorMessage className={styles['error-message']}>
              {error}
            </ErrorMessage>
          )}
        </div>
      </>
    )
  },
)

TextInput.displayName = 'TextInput'
