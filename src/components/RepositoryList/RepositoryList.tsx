import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TableSortLabel,
	Paper,
	TablePagination,
	tableClasses,
	CircularProgress,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { IRepository } from '../../shared/types'
import styles from './RepositoryList.module.scss'
import { FC, useState } from 'react'
import {
	fetchRepositories,
	setPageCount,
} from '../../store/slices/repositoriesSlice'
import StarIcon from '@mui/icons-material/Star'

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

	const items = useSelector((state: RootState) => state.repositories.items)
	const loading = useSelector((state: RootState) => state.repositories.loading)
	const error = useSelector((state: RootState) => state.repositories.error)
	const pageCount = useSelector(
		(state: RootState) => state.repositories.pageCount,
	)
	const repositoryCount = useSelector(
		(state: RootState) => state.repositories.repositoryCount,
	)
	const query = useSelector((state: RootState) => state.repositories.query)

	const handleClickRow = (repo: IRepository) => {
		setSelectedRepo(repo)
	}

	const handleChangePage = (
		_: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		dispatch(setPageCount(+event.target.value))
		dispatch(
			fetchRepositories({
				query,
				first: +event.target.value,
			}),
		)
		setPage(0)
		setSelectedRepo(null)
	}

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

	if (repositoryCount === null) {
		return (
			<main className={styles['empty-page']}>
				<div className={styles['empty-page__text']}>Добро пожаловать</div>
			</main>
		)
	}

	if (loading) {
		return (
			<main className={styles['empty-page']}>
				<CircularProgress />
			</main>
		)
	}

	if (error !== null) {
		return (
			<main className={styles['empty-page']}>
				<div className={styles['empty-page__text']}>{error}</div>
			</main>
		)
	}

	return (
		<main className={styles.container}>
			<div className={styles.main}>
				<div>
					<h1 className={styles.main__title}>Результаты поиска</h1>
					<TableContainer component={Paper} className={styles.main__table}>
						<Table
							sx={{
								[`& .${tableClasses.root}`]: {
									borderLeft: 'none',
									borderRight: 'none',
								},
							}}
						>
							<TableHead>
								<TableRow>
									<TableCell>Название</TableCell>
									<TableCell>Язык</TableCell>
									<TableCell>
										<TableSortLabel
											active={sortConfig.field === 'forks'}
											direction={
												sortConfig.field === 'forks'
													? sortConfig.direction
													: 'asc'
											}
											onClick={() => handleSort('forks')}
										>
											Число форков
										</TableSortLabel>
									</TableCell>
									<TableCell>
										<TableSortLabel
											active={sortConfig.field === 'stars'}
											direction={
												sortConfig.field === 'stars'
													? sortConfig.direction
													: 'asc'
											}
											onClick={() => handleSort('stars')}
										>
											Число звёзд
										</TableSortLabel>
									</TableCell>
									<TableCell>
										<TableSortLabel
											active={sortConfig.field === 'updated'}
											direction={
												sortConfig.field === 'updated'
													? sortConfig.direction
													: 'asc'
											}
											onClick={() => handleSort('updated')}
										>
											Дата обновления
										</TableSortLabel>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((repo: IRepository) => (
									<TableRow key={repo.id} onClick={() => handleClickRow(repo)}>
										<TableCell>{repo.name}</TableCell>
										<TableCell>{repo.primaryLanguage?.name || 'N/A'}</TableCell>
										<TableCell>{repo.forks.totalCount}</TableCell>
										<TableCell>{repo.stargazers.totalCount}</TableCell>
										<TableCell>
											{new Date(repo.updatedAt).toLocaleDateString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<TablePagination
					component='div'
					count={repositoryCount}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={pageCount}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
			<div className={styles.aside}>
				{!selectedRepo ? (
					<div className={styles.aside__container}>
						<div className={styles.aside__text}>Выберите репозиторий</div>
					</div>
				) : (
					<div className={styles.aside__form}>
						<h2 className={styles.aside__form__title}>{selectedRepo.name}</h2>
						<div className={styles.aside__form__block}>
							{selectedRepo.primaryLanguage?.name ? (
								<div className={styles.aside__form__language}>
									{selectedRepo.primaryLanguage?.name}
								</div>
							) : (
								<div></div>
							)}
							<div className={styles.aside__form__star}>
								<StarIcon className={styles.star} />
								<div>{selectedRepo.stargazers.totalCount || ''}</div>
							</div>
						</div>
						<div className={styles.aside__form__topic}>
							{selectedRepo.repositoryTopics.nodes.map(item => (
								<div
									className={styles.aside__form__topic__item}
									key={item.topic.name}
								>
									{item.topic.name}
								</div>
							))}
						</div>
						<div>{selectedRepo.description}</div>
					</div>
				)}
			</div>
		</main>
	)
}

export { RepositoryList }
