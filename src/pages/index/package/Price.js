import React, { useEffect, useState } from 'react'
import { Grid, Card } from 'semantic-ui-react'

import { useSubstrateState } from '../../../substrate-lib'

function Main(props) {
    const { api } = useSubstrateState()
    const [pricedata, setPricedata] = useState({ price: null, marketCap: null, dailyVolume: null })

    useEffect(() => {
        const getPricedata = async () => {
            try {
                //const data = null
                setPricedata({ price: '0.013', marketCap: '0M', dailyVolume: '0M' })
            } catch (e) {
                console.error(e)
            }
        }
        getPricedata()
    }, [api.rpc.state])

    return (
        <Grid.Column>
            <Card className='bg-light-gray box-shadow-none '>
                <Card.Content>
                    <Card.Header>Price</Card.Header>
                    <Card.Meta className='mt-3'>
                        <div className='d-flex'>
                            <h1 className='text-white'>${pricedata.price}</h1> <small class="text-gradient-pink-blue">↓ -0.1%</small>
                        </div>

                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <span className='text-white'>24h Vol: <span className='text-gradient-pink-blue'>${pricedata.dailyVolume}</span></span>
                    &nbsp;&nbsp;
                    <span className='text-white'>MCap: <span className='text-gradient-pink-blue'>${pricedata.marketCap}</span></span>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}

export default function Metadata(props) {
    const { api } = useSubstrateState()
    return api.rpc && api.rpc.state && api.rpc.state.getMetadata ? (
        <Main {...props} />
    ) : null
}
