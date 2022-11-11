import React, { useEffect, useState } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'

import { useSubstrateState } from '../../../substrate-lib'

function Main(props) {
  const { api } = useSubstrateState()
  const [nodeInfo, setNodeInfo] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion, type] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
          api.rpc.system.chainType()
        ])
        setNodeInfo({ chain, nodeName, nodeVersion, type })
      } catch (e) {
        console.error(e)
      }
    }
    getInfo()
  }, [api.rpc.system])

  return (
    <Grid.Column >
      <Card className='bg-light-gray box-shadow-none '>
        <Card.Content >
          <Card.Header >{nodeInfo.chain}</Card.Header>
          <Card.Meta className='mt-3'>
            <div className='d-flex'>
              <h1 className='text-white'>0.00</h1> <div className='mt-1'><small class="text-gradient-pink-blue">Supply</small></div>
            </div>

          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button className='gradient-button text-white'>{(nodeInfo.type && typeof nodeInfo.type.local !== 'undefined') ? 'Mainnet' : 'Testnet'}</Button>

        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default function NodeInfo(props) {
  const { api } = useSubstrateState()
  return api.rpc &&
    api.rpc.system &&
    api.rpc.system.chain &&
    api.rpc.system.name &&
    api.rpc.system.version ? (
    <Main {...props} />
  ) : null
}
