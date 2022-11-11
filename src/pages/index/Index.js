import React from 'react';
import {
    Container,
    Grid,
} from 'semantic-ui-react'
import BlockNumber from './package/BlockNumber'
import NodeInfo from './package/NodeInfo'
import Price from './package/Price'


const Index = () => {
    return (
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
    );
};

export default Index;