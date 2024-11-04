import Link from 'next/link'
import { Icon } from 'components/icon'
import styles from './pagination.module.scss'
import { classnames } from 'util/classnames'

export const Pagination = ({
  totalPages,
  currentPage,
  hrefForPage,
  className,
  scroll = true,
}) => {
  currentPage = parseInt(currentPage)
  totalPages = parseInt(totalPages)

  const PageLink = ({ page, children, disabled, className, scroll }) => (
    <Link
      scroll={scroll}
      href={hrefForPage?.(page) || '#'}
      onClick={(ev) => disabled && ev.preventDefault()}
      className={classnames(
        !children && styles.page,
        disabled && styles.disabled,
        className,
      )}
      replace
    >
      {children || page}
    </Link>
  )

  if (totalPages < 2) return
  return (
    <div className={classnames([styles.pagination, className])}>
      <PageLink
        page={currentPage - 1}
        className={styles.prev}
        disabled={currentPage === 1}
        scroll={scroll}
      >
        <Icon name="chevron-left" />
      </PageLink>
      {currentPage > 1 && <PageLink page={1} scroll={scroll} />}
      {currentPage > 3 && <Spacer />}
      {currentPage - 1 > 1 && (
        <PageLink page={currentPage - 1} scroll={scroll} />
      )}
      <PageLink
        page={currentPage}
        disabled
        className={classnames(styles.page, styles.active)}
        scroll={scroll}
      >
        {currentPage}
      </PageLink>
      {currentPage + 1 < totalPages && (
        <PageLink page={currentPage + 1} scroll={scroll} />
      )}
      {currentPage < totalPages - 2 && <Spacer />}
      {currentPage !== totalPages && (
        <PageLink page={totalPages} scroll={scroll} />
      )}
      <PageLink
        className={styles.next}
        disabled={currentPage === totalPages}
        page={currentPage + 1}
        scroll={scroll}
      >
        <Icon name="chevron-right" />
      </PageLink>
    </div>
  )
}

const Spacer = () => <div className={styles.spacer}>...</div>
