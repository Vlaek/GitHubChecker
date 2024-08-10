import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import client from '../../graphql/client'
import { SEARCH_REPOSITORIES } from '../../graphql/queries'
import {
	IFetchRepositoriesParams,
	IRepository,
	IPageInfo,
	ISearchRepositoriesResponse,
} from '../../shared/types'

export const fetchRepositories = createAsyncThunk<
	ISearchRepositoriesResponse,
	IFetchRepositoriesParams
>('repositories/fetchRepositories', async params => {
	const { query, first, after } = params

	const response = await client.query({
		query: SEARCH_REPOSITORIES,
		variables: { query, first, after },
	})

	return response.data.search
})

interface IRepositoriesState {
	items: IRepository[]
	repositoryCount: number | null
	loading: boolean
	error: string | null
	pageInfo: IPageInfo | null
	pageCount: number
	query: string
}

const initialState: IRepositoriesState = {
	items: [],
	repositoryCount: null,
	loading: false,
	error: null,
	pageInfo: null,
	pageCount: 10,
	query: '',
}

const repositoriesSlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		setPageCount: (state, action: PayloadAction<number>) => {
			state.pageCount = action.payload
		},
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchRepositories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchRepositories.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload.edges.map(edge => edge.node)
				state.repositoryCount = action.payload.repositoryCount
				state.pageInfo = action.payload.pageInfo
			})
			.addCase(fetchRepositories.rejected, (state, action) => {
				state.loading = false
				state.repositoryCount = 0
				state.error = action.error.message || ''
			})
	},
})

export const { setPageCount, setQuery } = repositoriesSlice.actions

export default repositoriesSlice.reducer
