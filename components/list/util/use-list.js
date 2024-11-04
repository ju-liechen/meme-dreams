import { omit } from 'ramda'
import { useRouter as useRouterDefault } from 'next/router'

/**
 * Custom hook to manage list query parameters and router interactions.
 *
 * The returned object should be passed along to ListProvider, eg.
 * const result = useList(...)
 * return <ListProvider {...result} >...</ListProvider>
 * 
 * @param {Object} options - Configuration options.
 * @param {string} [options.id='l'] - The identifier prefix for query parameters.
 * @param {Object} [options.defaultParams={limit: 25}] - Default query parameters.
 * @param {Function} options.useQuery - Hook to perform the query. It will be given the current params and should return a react-query useQuery result
 * @param {Function} [options.useRouter=useRouterDefault] - Hook to access the router.
 * 
 * @returns {Object} An object containing router, parameters, and methods to manipulate query parameters.
 * @returns {Object} return.router - The next router (the result of useRouter()).
 * @returns {Object} return.params - The current query parameters for the list.
 * @returns {Function} return.setParam - Function to set a query parameter.
 * @param {string} return.setParam.name - The name of the parameter.
 * @param {string} return.setParam.value - The value of the parameter.
 * @param {Object} [return.setParam.options={removeIfFalsy: true}] - Options for setting the parameter.
 * @param {boolean} [return.setParam.options.removeIfFalsy=true] - Flag to remove the parameter if the value is falsy.
 * @returns {Function} return.removeParam - Function to remove a query parameter.
 * @param {string} return.removeParam.name - The name of the parameter to remove.
 * @returns {number|undefined} return.count - The count of items from the count query.
 * @returns {Object} return.query - The result of the query (the result of calling the useQuery passed as an argument).
 */
export const useList = ({id = 'l', defaultParams = {limit: 25}, useQuery, useRouter = useRouterDefault}) => {
  const router = useRouter()
  const params = {
    ...defaultParams,
    ...Object.fromEntries(
      Object.entries(router.query)
	.filter(([name]) => name.startsWith(`${id}.`))
	.map(([name, value]) => [name.slice(id.length + 1), value])
    )
  }
  const countQuery = useQuery({...params, limit: 0, offset: 0})
  const query = useQuery(params)
  return {
    router,
    params,
    setParam: (name, value, {removeIfFalsy = true} = {removeIfFalsy: true}) => ({
      pathname: router.pathname,
      query: {
	...omit([queryName({id, name}), queryName({id, name: 'offset'})], router.query),
	...(removeIfFalsy && !value) ? {} : {[queryName({id, name})]: value}
      }
    }),
    removeParam: (name) => ({
      pathname: router.pathname,
      query: omit([queryName({id, name})], router.query)
    }),
    count: countQuery.data?.count,
    query
  }
}

const queryName = ({id, name}) => id ? `${id}.${name}` : name
