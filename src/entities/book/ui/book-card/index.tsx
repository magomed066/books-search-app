import { IBook } from '@/shared/api/books'
import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from './index.module.scss'

interface Props {
	book: IBook
}

export const BookCard: FC<Props> = ({ book }) => {
	return (
		<Card as={Link} to={`/book/${book.id}`} className={styles.card}>
			<div className={styles['card-img']}>
				<LazyLoadImage
					src={book?.volumeInfo?.imageLinks?.smallThumbnail}
					effect="blur"
				/>
			</div>

			<Card.Body>
				<Card.Text className="text-secondary">
					{book?.volumeInfo?.categories?.[0]}
				</Card.Text>
				<Card.Title className="my-3 text-dark">
					{book?.volumeInfo?.title}
				</Card.Title>
				<Card.Text className="text-secondary">
					{book?.volumeInfo?.authors?.map((item) => item).join(', ')}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}
