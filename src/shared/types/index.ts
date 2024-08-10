export interface IRepository {
	id: number
	name: string
	url: string
	primaryLanguage: {
		name: string
	} | null
	forks: {
		totalCount: number
	}
	repositoryTopics: {
		nodes: {
			topic: {
				name: string
			}
		}[]
	}
	stargazers: {
		totalCount: number
	}
	updatedAt: string
	description: string | null
	licenseInfo: {
		name: string
	} | null
}

export interface IPageInfo {
	endCursor: string | null
	hasNextPage: boolean
}

export interface ISearchRepositoriesResponse {
	repositoryCount: number
	edges: { node: IRepository; cursor: string }[]
	pageInfo: IPageInfo
}

export interface IFetchRepositoriesParams {
	query: string
	first: number
}
