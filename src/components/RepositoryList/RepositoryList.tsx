import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { LoadingState } from '../Loader/Loader'
import { PaginationControls } from '../PaginationControls/PaginationControls'
import { RepositoryAside } from '../RepositoryAside/RepositoryAside'
import { RepositoryTable } from '../RepositoryTable/RepositoryTable'
import { IRepository } from './../../shared/types/index'
import {
	fetchRepositories,
	setPageCount,
} from './../../store/slices/repositoriesSlice'
import styles from './RepositoryList.module.scss'

const RepositoryList: FC = () => {
	const [page, setPage] = useState(0)
	const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null)
	const [sortConfig, setSortConfig] = useState<{
		field: string
		direction: 'asc' | 'desc'
	}>({
		field: '',
		direction: 'asc',
	})

	const dispatch: AppDispatch = useDispatch()

	const { items, loading, error, pageCount, repositoryCount, pageInfo, query } =
		useSelector((state: RootState) => state.repositories)

	const handleSort = (field: string) => {
		const direction =
			sortConfig.field === field && sortConfig.direction === 'asc'
				? 'desc'
				: 'asc'
		setSortConfig({ field, direction })
		dispatch(
			fetchRepositories({
				query: `${query} sort:${sortConfig.field}-${sortConfig.direction}`,
				first: pageCount,
			}),
		)
	}

	if (loading || error) {
		return <LoadingState loading={loading} error={error} />
	}

	if (repositoryCount === null) {
		return (
			<main className={styles['empty-page']}>
				<div className={styles['empty-page__text']}>Добро пожаловать</div>
			</main>
		)
	}

	return (
		<main className={styles.container}>
			<div className={styles.main}>
				<div>
					<h1 className={styles.main__title}>Результаты поиска</h1>
					<RepositoryTable
						selectedRepo={selectedRepo}
						items={items}
						sortConfig={sortConfig}
						onSort={handleSort}
						onRowClick={setSelectedRepo}
					/>
				</div>
				<PaginationControls
					page={page}
					pageCount={pageCount}
					repositoryCount={repositoryCount}
					onPageChange={setPage}
					onRowsPerPageChange={event => {
						dispatch(setPageCount(+event.target.value))
						dispatch(fetchRepositories({ query, first: +event.target.value }))
						setPage(0)
						setSelectedRepo(null)
					}}
				/>
			</div>
			<RepositoryAside repo={selectedRepo} />
		</main>
	)
}

export { RepositoryList }
