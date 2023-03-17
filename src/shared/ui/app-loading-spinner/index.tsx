import { Spinner } from 'react-bootstrap'
import styles from './index.module.scss'

export const AppSpinner = () => {
	return (
		<div className={styles['app-loading']}>
			<Spinner animation="border" variant="primary">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	)
}
