import { FC } from 'react'
import { TablePagination } from '@mui/material'

interface IPaginationControlsProps {
	page: number
	pageCount: number
	repositoryCount: number
	onPageChange: (newPage: number) => void
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PaginationControls: FC<IPaginationControlsProps> = props => {
	const {
		page,
		pageCount,
		repositoryCount,
		onPageChange,
		onRowsPerPageChange,
	} = props

	return (
		<TablePagination
			component='div'
			count={repositoryCount}
			page={page}
			onPageChange={(_, newPage) => onPageChange(newPage)}
			rowsPerPage={pageCount}
			onRowsPerPageChange={onRowsPerPageChange}
		/>
	)
}

export { PaginationControls }
