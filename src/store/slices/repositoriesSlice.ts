import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import client from '../../graphql/client'
import { SEARCH_REPOSITORIES } from '../../graphql/queries'
import {
	IFetchRepositoriesParams,
	IRepository,
	IPageInfo,
	ISearchRepositoriesResponse,
} from '../../shared/types'

// Определение типа данных, которые возвращаются из асинхронной функции
// ISearchRepositoriesResponse - Тип данных, возвращаемых в случае успеха
// IFetchRepositoriesParams - Тип данных для параметров функции
export const fetchRepositories = createAsyncThunk<
	ISearchRepositoriesResponse,
	IFetchRepositoriesParams
>('repositories/fetchRepositories', async params => {
	const { query, first, after } = params

	// Выполнение запроса к серверу с использованием клиента
	const response = await client.query({
		query: SEARCH_REPOSITORIES,
		variables: { query, first, after },
	})

	// Возврат данных из ответа
	return response.data.search
})

// Интерфейс состояния
interface IRepositoriesState {
	items: IRepository[]
	repositoryCount: number | null
	loading: boolean
	error: string | null
	pageInfo: IPageInfo | null
	pageCount: number
	query: string
}

// Начальное состояние
const initialState: IRepositoriesState = {
	items: [],
	repositoryCount: null,
	loading: false,
	error: null,
	pageInfo: null,
	pageCount: 10,
	query: '',
}

// Создание среза состояния для репозиториев
const repositoriesSlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		// Редуктор для установки количества страниц
		setPageCount: (state, action: PayloadAction<number>) => {
			state.pageCount = action.payload
		},
		// Редуктор для установки поискового запроса
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload
		},
	},
	extraReducers: builder => {
		// Обработка состояний асинхронного запроса
		builder
			.addCase(fetchRepositories.pending, state => {
				// Состояние при ожидании запроса
				state.loading = true
				state.error = null
			})
			.addCase(fetchRepositories.fulfilled, (state, action) => {
				// Состояние при успешном завершении запроса
				state.loading = false
				state.items = action.payload.edges.map(edge => edge.node)
				state.repositoryCount = action.payload.repositoryCount
				state.pageInfo = action.payload.pageInfo
			})
			.addCase(fetchRepositories.rejected, (state, action) => {
				// Состояние при ошибке запроса
				state.loading = false
				state.repositoryCount = 0
				state.error = action.error.message || ''
			})
	},
})

export const { setPageCount, setQuery } = repositoriesSlice.actions

export default repositoriesSlice.reducer
