import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
	getBooksByName,
	getBooksSelector,
	setCategory,
	setOrderBy,
} from '@/entities/book'
import {
	booksCategories,
	booksSorting,
	ICategory,
	IOrderBy,
} from '@/shared/api/books'

export const SearchForm = () => {
	const { orderBy, category, searchValue } = useAppSelector(getBooksSelector)

	const [searchName, setSearchName] = useState<string>('')
	const [emptyField, setEmptyField] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchName(e.target.value)
	}

	const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setOrderBy(e.target.value as IOrderBy))
	}
	const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setCategory(e.target.value as ICategory))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!searchName.length) {
			setEmptyField(true)
			return
		}

		setEmptyField(false)
		dispatch(getBooksByName({ name: searchName, category, orderBy }))
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3 d-flex gap-2">
				<Form.Control
					type="text"
					name="name"
					defaultValue={searchValue}
					placeholder="Enter name"
					onChange={handleChange}
					isInvalid={emptyField}
				/>

				<Form.Control.Feedback type="invalid" tooltip>
					Please type a book's name
				</Form.Control.Feedback>

				<Button variant="outline-success" type="submit">
					Search
				</Button>
			</Form.Group>

			<div className="d-flex gap-3">
				<Form.Group className="mb-3 d-flex w-100 flex-column">
					<Form.Label>Categories</Form.Label>
					<Form.Select aria-label="Categories" onChange={handleChangeCategory}>
						{booksCategories.map((item, i) => (
							<option key={item + i} value={item}>
								{item[0].toUpperCase() + item.slice(1)}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3 d-flex w-100 flex-column ">
					<Form.Label>Sorting by</Form.Label>
					<Form.Select aria-label="Sorting by" onChange={handleChangeSorting}>
						{booksSorting.map((item, i) => (
							<option key={item + i} value={item}>
								{item[0].toUpperCase() + item.slice(1)}
							</option>
						))}
					</Form.Select>
				</Form.Group>
			</div>
		</Form>
	)
}
