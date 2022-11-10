import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import Header from './Header'
//import AccountSelector from './AccountSelector'
//import Balances from './Balances'
import BlockNumber from './BlockNumber'
//import Events from './Events'
//import Interactor from './Interactor'
//import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import Price from './Price'
//import TemplateModule from './TemplateModule'
//import Transfer from './Transfer'
//import Upgrade from './Upgrade'
import Search from './Search'

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
        <Header/>
      </Sticky>
      <Container className='mt-50'>
        <Search />
        <Container className='mt-50'>
          <Grid stackable columns="equal">
            <Grid.Row stretched>
              <NodeInfo />
              <Price />
              <BlockNumber />
              <BlockNumber finalized />
            </Grid.Row>

          </Grid>
        </Container>

      </Container>
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
