import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './types'
import { booksReducer } from '@/entities/book'
import { isDevEnv } from '@/shared/config'

const store = configureStore({
	reducer: {
		books: booksReducer,
	},
	devTools: isDevEnv,
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
