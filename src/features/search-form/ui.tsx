import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAppDispatch } from '@/app/store'
import { getBooksByName } from '@/entities/book'

export const SearchForm = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const dispatch = useAppDispatch()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		dispatch(getBooksByName(searchQuery))
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group
				className="mb-3 d-flex gap-2"
				controlId="formBasicEmail"
				onChange={handleChange}
			>
				<Form.Control type="text" name="name" placeholder="Enter name" />
				<Button variant="outline-success" type="submit">
					Search
				</Button>
			</Form.Group>
		</Form>
	)
}
