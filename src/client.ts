import { ApolloClient, InMemoryCache } from '@apollo/client'
import { typeDefs } from './typeDefs'

export const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
  typeDefs,
})
