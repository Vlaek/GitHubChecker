import { CircularProgress } from '@mui/material'
import { FC } from 'react'
import styles from './Loader.module.scss'

interface ILoadingStateProps {
	loading: boolean
	error: string | null
}

const LoadingState: FC<ILoadingStateProps> = props => {
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

export { LoadingState }
