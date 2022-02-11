import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'
import { ApolloProvider } from '@apollo/client'
import { client } from './client'

ReactDOM.render(
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
