import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import {
	Loader,
	PaginationControls,
	RepositoryAside,
	RepositoryTable,
} from '../'
import { IRepository, ISortConfig } from './../../shared/types/index'
import {
	fetchRepositories,
	setPageCount,
} from './../../store/slices/repositoriesSlice'
import styles from './RepositoryList.module.scss'

const RepositoryList: FC = () => {
	const [page, setPage] = useState(0)
	const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null)
	const [sortConfig, setSortConfig] = useState<ISortConfig | null>(null)
	const [cursors, setCursors] = useState<string[]>([])

	const dispatch: AppDispatch = useDispatch()
	const { items, loading, error, pageCount, repositoryCount, pageInfo, query } =
		useSelector((state: RootState) => state.repositories)

	const handleSort = (field: string) => {
		const direction =
			sortConfig?.field === field && sortConfig?.direction === 'asc'
				? 'desc'
				: 'asc'
		setPage(0)
		setCursors([])
		setSortConfig({ field, direction })
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const newPageCount = +event.target.value
		dispatch(setPageCount(newPageCount))
		setPage(0)
		setCursors([])
	}

	useEffect(() => {
		if (pageInfo?.endCursor && !cursors.includes(pageInfo.endCursor)) {
			setCursors(prevCursors => [...prevCursors, pageInfo?.endCursor || ''])
		}
	}, [page, pageInfo])

	useEffect(() => {
		setPage(0)
		setSortConfig(null)
		setCursors([])
	}, [query])

	useEffect(() => {
		dispatch(
			fetchRepositories({
				query: sortConfig
					? `${query} sort:${sortConfig.field}-${sortConfig.direction}`
					: query,
				first: pageCount,
				after: page > 0 ? cursors[page - 1] : undefined,
			}),
		)
	}, [dispatch, query, sortConfig, page, pageCount, cursors])

	return (
		<main className={styles.container}>
			{loading || error ? (
				<Loader loading={loading} error={error} />
			) : (
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
						repositoryCount={repositoryCount ?? 0}
						onPageChange={setPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</div>
			)}
			<RepositoryAside repo={selectedRepo} />
		</main>
	)
}

export { RepositoryList }
