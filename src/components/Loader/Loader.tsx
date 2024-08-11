import { FC } from 'react'
import { CircularProgress } from '@mui/material'
import styles from './Loader.module.scss'

interface ILoaderStateProps {
	loading: boolean
	error: string | null
}

// Компонент Loader, который отображает индикатор загрузки или ошибку в зависимости от состояния
const Loader: FC<ILoaderStateProps> = props => {
	const { loading, error } = props

	// Если идет загрузка, отображаем индикатор загрузки
	if (loading) {
		return (
			<main className={styles['empty-page']}>
				<CircularProgress />
			</main>
		)
	}

	// Если произошла ошибка, отображаем сообщение об ошибке
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
