import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql'
const token = import.meta.env.VITE_GITHUB_TOKEN

const client = new ApolloClient({
  link: new HttpLink({
    uri: GITHUB_GRAPHQL_API,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  cache: new InMemoryCache(),
})

export default client
