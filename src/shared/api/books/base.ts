import axios from 'axios'
import { API_URL, API_URL_API_KEY } from '@/shared/config'

const apiInstance = axios.create({
	baseURL: API_URL,
	params: {
		key: API_URL_API_KEY,
	},
})

export default apiInstance
