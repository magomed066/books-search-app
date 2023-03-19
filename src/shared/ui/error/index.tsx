import styles from './index.module.scss'

const ErrorMessage = () => {
	return (
		<div className={styles.error}>
			<h3 className="text-primary">Sorry.. something went wrong</h3>
		</div>
	)
}

export default ErrorMessage
