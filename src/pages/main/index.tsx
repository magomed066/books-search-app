import { Col, Container, Row } from 'react-bootstrap'
import { useAppSelector } from '@/app/store'
import { BookCard, getBooksSelector } from '@/entities/book'
import { SearchForm } from '@/features/search-form'
import { Loader } from '@/shared/ui'
import { LoadMoreButton } from '@/features/load-more'

const Main = () => {
	const { books, isLoading, totalItems } = useAppSelector(getBooksSelector)

	const loading = isLoading ? (
		<Loader animation="border" variant="primary" />
	) : null

	const content = !loading
		? books?.map((item, i) => <BookCard key={item.id + i} book={item} />)
		: null

	return (
		<Container className="pb-3">
			<Row className="justify-content-center">
				<Col md={8}>
					<h1 className="text-center">Search for books</h1>
				</Col>
			</Row>

			<Row className="justify-content-center mt-3">
				<Col sm={12} xs={12} md={8} lg={6}>
					<SearchForm />
				</Col>

				{books.length ? (
					<p className="mt-3 text-center">Total results: {totalItems}</p>
				) : null}
			</Row>

			<Row className="justify-content-center mt-3">
				<Col
					className="d-flex gap-3 col-12 justify-content-center  flex-wrap my-3"
					sm={12}
					md={12}
				>
					{content}
				</Col>

				{loading}

				{books.length ? <LoadMoreButton /> : null}
			</Row>
		</Container>
	)
}

export default Main
