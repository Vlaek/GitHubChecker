import { gql } from '@apollo/client'

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories(
    $query: String!
    $first: Int!
    $after: String
    $orderBy: RepositoryOrder!
  ) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after, orderBy: $orderBy) {
      repositoryCount
      edges {
        node {
          ... on Repository {
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
