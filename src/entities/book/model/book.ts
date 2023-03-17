import { RootState } from '@/app/store/types'
import { bookService } from '@/shared/api'
import { IBook } from '@/shared/api/books'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

interface InitialState {
	books: IBook[]
	totalItems: number
	isLoading: boolean
	isError: null | string | boolean
}

type GetBooksByNamePayload = Pick<InitialState, 'books' | 'totalItems'>

export const getBooksByName = createAsyncThunk(
	'books/getByName',
	async (name: string) => {
		try {
			const { data } = await bookService.getBooksByName(name)

			return {
				books: data.items,
				totalItems: data.totalItems,
			}
		} catch (error) {
			return error
		}
	},
)

const initialState: InitialState = {
	books: [],
	totalItems: 0,
	isLoading: false,
	isError: null,
}

const bookModel = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getBooksByName.pending, (state) => {
				state.isLoading = true
				state.isError = null
			})
			.addCase(getBooksByName.fulfilled, (state, action) => {
				const data = action.payload as GetBooksByNamePayload

				state.books = data.books
				state.totalItems = data.totalItems

				state.isLoading = false
			}),
})

export const getBooksSelector = createSelector(
	(state: RootState) => state.books,
	(books) => books,
)

export const booksReducer = bookModel.reducer
