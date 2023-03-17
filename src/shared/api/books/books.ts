import { AxiosPromise } from 'axios'
import apiInstance from './base'
import { IBook } from './models'

interface IResponse {
	kind: string
	totalItems: number
	items: IBook[]
}

export const getBooksByName = async (name: string): AxiosPromise<IResponse> => {
	return await apiInstance.get(`/volumes`, {
		params: {
			q: name,
		},
	})
}
