import { forwardRef } from 'react'
import Link from 'next/link'
import { Icon } from 'components/icon'
import { InlineLoader } from 'components/loading'
import { classnames } from '/util/classnames'
import PropTypes from 'prop-types'

import styles from './button.module.scss'

/**
 * Button component.
 *
 * @component
 *
 * @param {string} href - The URL to navigate to when the button is clicked. If provided, the button will render as an `a` tag instead of a `button` tag.
 * @param {string} [target='_self'] - Where to open the linked URL. Only applicable when `href` is provided. Defaults to '_self'.
 * @param {string} [variation='primary'] - The style variation of the button. Can be 'primary', 'secondary', or 'text'. Defaults to 'primary'.
 * @param {string} [size='medium'] - The size of the button. Can be 'small' or 'medium'. Defaults to 'medium'.
 * @param {ReactNode} children - The content to render inside the button.
 * @param {string} icon - The name of the icon to display in the button.
 * @param {string} [iconPosition='right'] - The position of the icon. Can be 'left' or 'right'. Defaults to 'right'.
 * @param {string} iconVariation - The variation of the icon. Can be 'stroked' or 'filled.
 * @param {string} [type='button'] - The type of the button. Can be 'button', 'submit', or 'reset'. Defaults to 'button'.
 * @param {boolean} fullWidth - Should the button span fullWidth/100% width
 * @param {boolean} isLoading - Whether the button should display in a loading state.
 * @param {string} [loadingText='Loading...'] - The text to display when the button is in a loading state. Defaults to 'Loading...'.
 * @param {boolean} hideText - Wrap the text in a hidden class.
 * @param {string} className - Additional CSS class(es) to apply to the button.
 * @param {object} props - Additional props to pass to the button.
 *
 * @example
 * <Button href="https://example.com" variation="secondary" size="small" icon="arrow-right" iconPosition="left" isLoading={true}>
 *   Click me
 * </Button>
 */

export const Button = forwardRef(
  (
    {
      href,
      target = '_self',
      variation = 'primary',
      size = 'medium',
      children,
      icon,
      iconPosition = 'right',
      iconVariation = 'stroked',
      iconColor,
      type = 'button',
      isLoading,
      loadingText = 'Loading...',
      className,
      hideText,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const iconComponent = icon && (
      <Icon
        name={isLoading ? 'loading' : icon}
        variation={isLoading ? 'stroked' : iconVariation}
        color={iconColor}
        className={classnames(
          styles['btn-icon'],
          styles[`btn-icon-${iconPosition === 'left' ? 'left' : 'right'}`]
        )}
      />
    )

    const classes = classnames([
      styles.btn,
      icon ? styles['btn-has-icon'] : null,
      styles[`btn-${variation}`],
      styles[`btn-${size}`],
      styles[`btn-${href ? 'link' : 'button'}`],
      fullWidth ? styles['btn-full-width'] : null,
      isLoading ? styles['is-loading'] : null,
      className,
    ])

    return href ? (
      <Link
        href={href}
        className={classes}
        target={target}
        ref={ref}
        {...props}
      >
        <InnerMarkup
          text={children}
          hideText={hideText}
          isLoading={isLoading}
          loadingText={loadingText}
          icon={icon}
          iconPosition={iconPosition}
          iconComponent={iconComponent}
        />
      </Link>
    ) : (
      <button type={type} className={classes} ref={ref} {...props}>
        <InnerMarkup
          text={children}
          hideText={hideText}
          isLoading={isLoading}
          loadingText={loadingText}
          icon={icon}
          iconPosition={iconPosition}
          iconComponent={iconComponent}
        />
      </button>
    )
  }
)

const InnerMarkup = ({
  text,
  isLoading,
  loadingText,
  icon,
  iconPosition,
  iconComponent,
  hideText,
  children,
}) => (
  <span
    className={classnames([
      styles['btn-wrap'],
      hideText ? styles['hidden-text'] : null,
    ])}
  >
    {icon && iconPosition === 'left' && iconComponent}
    {text && (
      <span
        className={classnames([
          styles['btn-text'],
          hideText ? 'visually-hidden' : null,
        ])}
      >
        {isLoading ? loadingText : text}
        {isLoading && <InlineLoader className={styles['button-loading']} />}
      </span>
    )}
    {icon && iconPosition === 'right' && iconComponent}
    {children}
  </span>
)

Button.propTypes = {
  href: PropTypes.string,
  target: PropTypes.oneOf(['_self', '_blank']),
  size: PropTypes.oneOf(['small', 'medium']),
  variation: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'text',
    'icon',
  ]),
  children: PropTypes.node,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconVariation: PropTypes.oneOf(['filled', 'stroked']),
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  className: PropTypes.string,
}

InnerMarkup.propTypes = {
  text: PropTypes.node,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  iconComponent: PropTypes.element,
  children: PropTypes.node,
}

// Provide default prop types if any are optional
Button.defaultProps = {
  target: '_self',
  variation: 'primary',
  size: 'medium',
  iconPosition: 'right',
  type: 'button',
  loadingText: 'Loading...',
}
