import { FC } from 'react'
import { CircularProgress } from '@mui/material'
import styles from './Loader.module.scss'

interface ILoaderStateProps {
	loading: boolean
	error: string | null
}

const Loader: FC<ILoaderStateProps> = props => {
	const { loading, error } = props

	if (loading) {
		return (
			<main className={styles['empty-page']}>
				<CircularProgress />
			</main>
		)
	}

	if (error) {
		return (
			<main className={styles['empty-page']}>
				<div className={styles['empty-page__text']}>{error}</div>
			</main>
		)
	}

	return null
}

export { Loader }
