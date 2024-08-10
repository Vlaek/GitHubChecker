import { FC } from 'react'
import { RepositoryList } from '../RepositoryList/RepositoryList'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { LoadingState } from '../Loader/Loader'
import styles from './Main.module.scss'

const Main: FC = () => {
	const { loading, error, repositoryCount } = useSelector(
		(state: RootState) => state.repositories,
	)

	if (repositoryCount === null) {
		return (
			<main className={styles['empty-page']}>
				{loading || error ? (
					<LoadingState loading={loading} error={error} />
				) : (
					<div className={styles['empty-page__text']}>Добро пожаловать</div>
				)}
			</main>
		)
	}

	return <RepositoryList />
}

export { Main }
