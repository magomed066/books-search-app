import { IBook } from '@/shared/api/books'
import { FC } from 'react'
import { Card } from 'react-bootstrap'

interface Props {
	book: IBook
}

export const BookCard: FC<Props> = ({ book }) => {
	return (
		<Card style={{ width: '15rem' }}>
			<Card.Img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail} />
			<Card.Body>
				<Card.Title>{book.volumeInfo.title}</Card.Title>
				<Card.Text className="text-truncate">
					{/* {book.volumeInfo.a} */}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}
