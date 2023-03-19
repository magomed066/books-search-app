import { useAppDispatch, useAppSelector } from '@/app/store'
import { getBookByID, getBooksSelector } from '@/entities/book'
import { Loader } from '@/shared/ui'
import { useEffect, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import parseHtml from 'html-react-parser'
import styles from './index.module.scss'

const Details = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const { bookDetails, isLoading, category } = useAppSelector(getBooksSelector)

	useEffect(() => {
		dispatch(getBookByID(id as string))
	}, [])

	const bookCategory = useMemo(
		() => bookDetails?.volumeInfo?.categories?.[0],
		[],
	)

	const searchCategory = useMemo(
		() =>
			category ? `${category[0].toUpperCase() + category.slice(1)} / ` : '',
		[],
	)

	if (isLoading) {
		return (
			<div className={styles.loader}>
				<Loader animation="border" variant="primary" />
			</div>
		)
	}

	return (
		<Container className={styles.details}>
			<Row className="py-3">
				<Link to="/" className="text-decoration-none">
					Go back
				</Link>
			</Row>

			<Row className="gap-3">
				<Col md={4}>
					<div className={styles['img-wrap']}>
						<LazyLoadImage
							src={bookDetails?.volumeInfo?.imageLinks?.smallThumbnail}
							effect="blur"
							className={styles.img}
						/>
					</div>
				</Col>
				<Col md={7} className="mw-sm-3">
					<div className={styles['info']}>
						<p className={styles['info-title__sup']}>
							{searchCategory}
							{bookCategory}
						</p>
						<h2 className="my-3">{bookDetails?.volumeInfo?.title}</h2>

						<p className="text-secondary">
							{bookDetails?.volumeInfo?.authors?.map((item) => item).join(', ')}
						</p>

						<p>{parseHtml(bookDetails?.volumeInfo?.description || '')}</p>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Details
