import React, { createRef } from 'react'
import { BrowserRouter as Router, Route }
  from 'react-router-dom';
import {
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import Search from './components/search/Search'

import Header from './Header'
import Index from './pages/index/Index';
import Block from './pages/block/Index';
import Transaction from './pages/transaction/Index';


function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Sphinx"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Sphinx')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div ref={contextRef}>

      <Sticky context={contextRef}>
        <Header />
      </Sticky>
      <Search />

      <Router>
        <Route exact path='/' component={Index} />
      </Router>
      <Router>
        <Route exact path='/blocks' component={Block} />
      </Router>
      <Router>
        <Route exact path='/transactions' component={Transaction} />
      </Router>
      <DeveloperConsole />
    </div>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
