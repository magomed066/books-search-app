import { RootState } from '@/app/store/types'
import { bookService } from '@/shared/api'
import { IBook, ICategory, IOrderBy } from '@/shared/api/books'
import {
	createAsyncThunk,
	createSelector,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface InitialState {
	books: IBook[]
	totalItems: number
	isLoading: boolean
	isLoadingMore: boolean
	booksEnded: boolean
	maxResults: number
	startIndex: number
	searchValue: string
	orderBy: IOrderBy
	category: ICategory
	bookDetails: IBook | null
}

type GetBooksByNamePayload = Pick<
	InitialState,
	'books' | 'totalItems' | 'searchValue'
>

interface GetBooksByNameProps {
	name: string
	orderBy: string
	category: string
}

type LoadMoreArgs = Pick<InitialState, 'startIndex' | 'maxResults'> & {
	name: string
}

export const getBooksByName = createAsyncThunk(
	'books/getByName',
	async (data: GetBooksByNameProps) => {
		const { name, orderBy, category } = data

		try {
			const { data } = await bookService.getBooksByName({
				name,
				orderBy,
				category,
			})

			if (!data?.items) {
				toast.warning('No data found!')
			}

			return {
				searchValue: name,
				books: data?.items || [],
				totalItems: data.totalItems,
			}
		} catch (error: unknown) {
			const err = error as AxiosError
			toast.error(err?.message)

			return error
		}
	},
)
export const loadMoreBooks = createAsyncThunk(
	'books/loadMore',
	async (props: LoadMoreArgs) => {
		try {
			const { data } = await bookService.getBooksByName({
				name: props.name,
				startIndex: props?.startIndex,
				maxResults: props?.maxResults,
			})

			return {
				searchValue: name,
				books: data.items,
			}
		} catch (error) {
			const err = error as AxiosError
			toast.error(err?.message)
			return error
		}
	},
)
export const getBookByID = createAsyncThunk(
	'books/getByID',
	async (id: string) => {
		try {
			const { data } = await bookService.getBookByID(id)

			return data.items[0]
		} catch (error) {
			const err = error as AxiosError
			toast.error(err?.message)
			return error
		}
	},
)

const initialState: InitialState = {
	books: [],
	totalItems: 0,
	isLoading: false,
	isLoadingMore: false,
	maxResults: 30,
	startIndex: 1,
	searchValue: '',
	booksEnded: false,
	orderBy: 'relevance',
	category: 'all',
	bookDetails: null,
}

const bookModel = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setOrderBy(state, action: PayloadAction<IOrderBy>) {
			state.orderBy = action.payload
		},
		setCategory(state, action: PayloadAction<ICategory>) {
			state.category = action.payload
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getBooksByName.pending, (state) => {
				state.isLoading = true
				state.books = []
			})
			.addCase(getBooksByName.fulfilled, (state, action) => {
				const data = action.payload as GetBooksByNamePayload

				if (state.searchValue != data.searchValue) {
					state.searchValue = data.searchValue
					state.startIndex = 0
				}

				state.startIndex = state.maxResults

				state.books = data.books
				state.totalItems = data.totalItems

				state.isLoading = false
			})
			.addCase(loadMoreBooks.pending, (state) => {
				state.isLoadingMore = true
				state.booksEnded = false
			})
			.addCase(loadMoreBooks.fulfilled, (state, action) => {
				const data = action.payload as GetBooksByNamePayload

				if (data.books.length < state.maxResults) {
					state.booksEnded = true
				}

				state.startIndex += data.books.length

				state.books = [...state.books, ...data.books]

				state.isLoadingMore = false
			})
			.addCase(getBookByID.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getBookByID.fulfilled, (state, action) => {
				const data = action.payload as IBook

				state.bookDetails = data

				state.isLoading = false
			}),
})

export const { setOrderBy, setCategory } = bookModel.actions

export const getBooksSelector = createSelector(
	(state: RootState) => state.books,
	(books) => books,
)

export const booksReducer = bookModel.reducer
