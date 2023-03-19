import { useAppDispatch, useAppSelector } from '@/app/store'
import { getBooksSelector, loadMoreBooks } from '@/entities/book'
import { Loader } from '@/shared/ui'
import { Button } from 'react-bootstrap'

export const LoadMoreButton = () => {
	const dispatch = useAppDispatch()
	const { searchValue, maxResults, startIndex, isLoadingMore, booksEnded } =
		useAppSelector(getBooksSelector)

	const loadMore = () => {
		dispatch(
			loadMoreBooks({
				name: searchValue,
				startIndex,
				maxResults,
			}),
		)
	}

	const loadingMore = isLoadingMore ? (
		<Loader animation="border" variant="primary" />
	) : null

	const loadMoreBtn = loadingMore ? (
		loadingMore
	) : !booksEnded ? (
		<Button className="col-2 mt-3" variant="light" onClick={loadMore}>
			Load more...
		</Button>
	) : null

	return loadMoreBtn
}
