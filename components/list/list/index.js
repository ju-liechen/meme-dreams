import { useListContext } from 'components/list/list-provider'

export const List = ({
  children,
  Error = () => 'Error',
  Loading = () => 'Loading...',
  Empty = () => 'Empty'
}) => {
  const { query } = useListContext()
  if (query.isError) return <Error />
  if (!query.data) return <Loading />
  if (!query.data.results.length) return <Empty />
  return children(query.data?.results)
}
