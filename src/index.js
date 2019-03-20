import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: localStorage
}).then(() => {
  const client = new ApolloClient({
    cache: cache,
    uri: 'http://localhost:4000/graphql',
    request: operation => {
      operation.setContext(context => ({
        headers: {
          ...context.headers,
          authorization: localStorage.getItem('token')
        }
      }))
    }
  })

  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )
})