import { Pagination as BasePagination } from 'components/pagination'
import { useListContext } from 'components/list/list-provider'

export const Pagination = () => {
  const { setParam, params, count } = useListContext()
  if (count === undefined) {
    return null 
  }
  return <BasePagination
    totalPages={Math.ceil(count / parseInt(params.limit))}
    currentPage={Math.floor(parseInt(params.offset || '0') / parseInt(params.limit)) + 1}
    hrefForPage={(page) => setParam('offset', (page - 1) * params.limit)}
  />
}
