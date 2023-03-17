import { FC } from 'react'
import { Spinner, SpinnerProps } from 'react-bootstrap'

export const Loader: FC<SpinnerProps> = (props) => {
	return (
		<div className="text-center">
			<Spinner {...props}>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	)
}
