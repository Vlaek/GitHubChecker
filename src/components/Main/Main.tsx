import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Loader, RepositoryList } from '../'
import styles from './Main.module.scss'

const Main: FC = () => {
	const { loading, error, repositoryCount } = useSelector(
		(state: RootState) => state.repositories,
	)

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

	return <RepositoryList />
}

export { Main }
