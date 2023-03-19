import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Main = lazy(() => import('./main'))
const Details = lazy(() => import('./details'))

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/book/:id" element={<Details />} />
		</Routes>
	)
}
