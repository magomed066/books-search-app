import { AxiosPromise } from 'axios'
import apiInstance from './base'
import { IBook } from './models'

interface IResponse {
	kind: string
	totalItems: number
	items: IBook[]
}

interface IGetBooksByNameProps {
	name: string
	startIndex?: number
	maxResults?: number
	orderBy?: string
	category?: string
}

export const booksCategories = [
	'all',
	'art',
	'biography',
	'computers',
	'history',
	'medical',
	'poetry',
] as const

export const booksSorting = ['relevance', 'newest'] as const

export type IOrderBy = typeof booksSorting[number]
export type ICategory = typeof booksCategories[number]

export const getBooksByName = async ({
	name,
	startIndex = 0,
	maxResults = 30,
	orderBy = 'relevance',
	category = 'all',
}: IGetBooksByNameProps): AxiosPromise<IResponse> => {
	return await apiInstance.get(`/volumes`, {
		params: {
			q: name + (category === 'all' ? '' : ` subject:${category}`),
			startIndex,
			maxResults,
			orderBy,
		},
	})
}

export const getBookByID = async (id: string): AxiosPromise<IResponse> => {
	return await apiInstance.get(`/volumes`, {
		params: {
			q: id,
		},
	})
}
