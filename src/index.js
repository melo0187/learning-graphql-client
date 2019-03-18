import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache: cache,
  uri: 'http://localhost:4000/graphql'
})

const setupAndRender = async () => {
  await persistCache({
    cache,
    storage: localStorage
  })
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )
}

setupAndRender()