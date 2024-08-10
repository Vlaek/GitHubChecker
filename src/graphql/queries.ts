import { gql } from '@apollo/client'

export const SEARCH_REPOSITORIES = gql`
	query SearchRepositories($query: String!, $first: Int!) {
		search(query: $query, type: REPOSITORY, first: $first) {
			repositoryCount
			edges {
				node {
					... on Repository {
						id
						name
						url
						primaryLanguage {
							name
						}
						forks {
							totalCount
						}
						repositoryTopics(first: 10) {
							nodes {
								topic {
									name
								}
							}
						}
						stargazers {
							totalCount
						}
						updatedAt
						description
						licenseInfo {
							name
						}
					}
				}
				cursor
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`
