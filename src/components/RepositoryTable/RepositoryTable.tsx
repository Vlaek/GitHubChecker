import { FC } from 'react'
import { IRepository } from './../../shared/types/index'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Paper,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import styles from './RepositoryTable.module.scss'

interface IRepositoryTable {
	selectedRepo: IRepository | null
	items: IRepository[]
	sortConfig: { field: string; direction: 'asc' | 'desc' } | null
	onSort: (field: string) => void
	onRowClick: (repo: IRepository) => void
}

const RepositoryTable: FC<IRepositoryTable> = props => {
	const { selectedRepo, items, sortConfig, onSort, onRowClick } = props

	return (
		<TableContainer component={Paper} className={styles.table}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Название</TableCell>
						<TableCell>Язык</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortConfig?.field === 'forks'}
								direction={
									sortConfig?.field === 'forks' ? sortConfig?.direction : 'asc'
								}
								onClick={() => onSort('forks')}
							>
								Число форков
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortConfig?.field === 'stars'}
								direction={
									sortConfig?.field === 'stars' ? sortConfig?.direction : 'asc'
								}
								onClick={() => onSort('stars')}
							>
								Число звёзд
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel
								active={sortConfig?.field === 'updated'}
								direction={
									sortConfig?.field === 'updated'
										? sortConfig?.direction
										: 'asc'
								}
								onClick={() => onSort('updated')}
							>
								Дата обновления
							</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map(repo => (
						<TableRow
							key={repo.id}
							onClick={() => onRowClick(repo)}
							className={
								repo.id === selectedRepo?.id ? styles['selected-row'] : ''
							}
						>
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
	)
}

export { RepositoryTable }
