import { FC, useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import {
	fetchRepositories,
	setQuery,
} from '../../store/slices/repositoriesSlice'
import styles from './SearchBar.module.scss'

// Компонент SearchBar управляет вводом поискового запроса
const SearchBar: FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const pageCount = useSelector(
		(state: RootState) => state.repositories.pageCount,
	)
	const [newQuery, setNewQuery] = useState('')

	// Функция для обработки нажатия кнопки поиска
	const handleSearch = () => {
		if (newQuery.trim()) {
			// Если запрос не пустой, запускаем поиск репозиториев
			dispatch(
				fetchRepositories({
					query: newQuery,
					first: pageCount,
				}),
			)
		}

		// Обновляем поисковый запрос в состоянии Redux
		dispatch(setQuery(newQuery))
	}

	return (
		<Box display='flex' alignItems='center' gap={1}>
			<TextField
				variant='outlined'
				size='small'
				value={newQuery}
				onChange={e => setNewQuery(e.target.value)}
				fullWidth
				placeholder='Введите поисковой запрос'
				className={styles.search}
				inputProps={{
					sx: {
						'&::placeholder': {
							fontStyle: 'italic',
						},
					},
				}}
				InputProps={{
					style: {
						height: '42px',
						fontWeight: 500,
					},
				}}
			/>
			<Button
				className={styles.btn}
				variant='contained'
				color='primary'
				onClick={handleSearch}
			>
				Искать
			</Button>
		</Box>
	)
}

export { SearchBar }
