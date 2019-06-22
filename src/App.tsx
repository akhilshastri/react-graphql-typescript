import React from 'react'

import { FocusStyleManager } from '@blueprintjs/core'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import styled from 'styled-components'

import TasksView from './components/TasksView'

FocusStyleManager.onlyShowFocusOnTabs()

// Create our Apollo client
const link = new HttpLink({ uri: process.env.GRAPHQL_URL! })
const client = new ApolloClient({ link, cache: new InMemoryCache() })

const StyledTasksView = styled(TasksView)`
  margin: 2em;
`

function App() {
  return (
    <ApolloProvider client={client}>
      <StyledTasksView />
    </ApolloProvider>
  )
}

export default App
