import { Col, Container, Row } from 'react-bootstrap'
import { useAppSelector } from '@/app/store'
import { BookCard, getBooksSelector } from '@/entities/book'
import { SearchForm } from '@/features/search-form'
import { Loader } from '@/shared/ui'

const Main = () => {
	const { books, isLoading } = useAppSelector(getBooksSelector)

	const loading = isLoading ? (
		<Loader animation="grow" variant="primary" />
	) : null
	const content = !loading
		? books.map((item) => <BookCard key={item.id} book={item} />)
		: null

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={4}>
					<h1 className="text-center">Search for books</h1>
				</Col>
			</Row>

			<Row className="justify-content-center mt-3">
				<Col md={4}>
					<SearchForm />
				</Col>
			</Row>

			<Loader animation="grow" variant="primary" />
			<Row className="justify-content-center mt-3">
				<Col className="d-flex gap-3 flex-wrap" md={12}>
					{loading}
					{content}
				</Col>
			</Row>
		</Container>
	)
}

export default Main
