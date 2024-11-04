import { useQuery as useQueryBase } from '@tanstack/react-query'
import { axiosClient } from 'util/axios-client'

export const useQuery = ({url, args, params, ...rest}) => useQueryBase({
  queryKey: [url, args, params],
  queryFn: async () => {
    const response = await axiosClient.get(replacePathParams(url, args), {params})
    return response.data
  },
  ...rest
})

const replacePathParams = (path, args) => 
  path.replace(/:([^/]+)/g, (_, key) => args[key])

