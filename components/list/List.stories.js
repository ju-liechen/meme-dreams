import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useList, ListProvider, List, TextInput, Pagination } from 'components/list'

export default {
  title: 'Components/List/ListProvider',
  component: ListProvider,
  tags: ['autodocs'],
}

const wait = async (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))

const mockResults = Array.from({length: 10}).map((_, i) => ({id: i, title: `Example ${i}`}))

const mockRequest = async (params) => {
  await wait(1000)
  const results = params.search ? mockResults.filter(result => result.title.includes(params.search)) : mockResults
  return {
    count: results.length,
    results: results.slice(params.offset || 0, params.limit)
  }
}

const useRouterMock = () => {
  const [params, setParams] = useState({})
  return {
    pathname: '/example',
    query: params,
    replace: ({query}) => setParams(query)
  }
}

const Template = () => {
  const methods = useList({
    id: 'posts',
    useRouter: useRouterMock,
    defaultParams: {limit: 3},
    useQuery: params => useQuery({
      queryKey: ['posts', params],
      queryFn: async () => {
	return await mockRequest(params)
      }
    })
  })
  return <ListProvider {...methods} >
    <div>
      <div>
	<TextInput name='search' placeholder='Search...' />
      </div>
      <div>
	<List>
	  {results => results.map(result =>
	    <div key={result.id} >{result.title}</div>
	  )}
	</List>
      </div>
      <Pagination />
    </div>
  </ListProvider>
}

export const Default = Template.bind({})
Default.args = {}
