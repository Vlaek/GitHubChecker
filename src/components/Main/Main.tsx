import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Loader, RepositoryList } from '../'
import styles from './Main.module.scss'

const Main: FC = () => {
	// Получаем состояния загрузки, ошибки и количества репозиториев из Redux
	const { loading, error, repositoryCount } = useSelector(
		(state: RootState) => state.repositories,
	)

	// Если количество репозиториев еще не определено (null),
	// отображаем либо Loader, либо приветственное сообщение
	if (repositoryCount === null) {
		return (
			<main className={styles['empty-page']}>
				{loading || error ? (
					<Loader loading={loading} error={error} />
				) : (
					<div className={styles['empty-page__text']}>Добро пожаловать</div>
				)}
			</main>
		)
	}

	// Если количество репозиториев уже известно, отображаем список репозиториев
	return <RepositoryList />
}

export { Main }
