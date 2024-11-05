import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
  },
})

axiosClient.interceptors.response.use(
  (response) => {
    // This function simply returns the response as is, without modification.
    // It's a placeholder for potentially transforming response data in the future.
    return response
  },
  (error) => {
    // This function catches any errors from the response.
    // Similar to the request interceptor, it forwards the error to be handled by .catch().
    return Promise.reject(error)
  }
)

export { axiosClient }