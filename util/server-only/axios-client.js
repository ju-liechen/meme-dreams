import { API_URL } from 'util/settings'
import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {'Content-Type': 'application/json'},
})

