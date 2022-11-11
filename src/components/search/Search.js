import React, { useEffect } from 'react'
import { Grid, Search, Container } from 'semantic-ui-react'

import { useSubstrateState } from '../../substrate-lib'

function Main(props) {
    const { api } = useSubstrateState()


    useEffect(() => {
        let unsubscribe
        api.query.templateModule
            .something(newValue => {
                // The storage value is an Option<u32>
                // So we have to check whether it is None first
                // There is also unwrapOr

            })
            .then(unsub => {
                unsubscribe = unsub
            })
            .catch(console.error)

        return () => unsubscribe && unsubscribe()
    }, [api.query.templateModule])

    return (
        <Container className='mt-50'>
            <Grid.Column>

                <Search className='box-shadow-none '
                    input={{ icon: 'search', iconPosition: 'left' }}
                    placeholder="Search for accounts, blocks, transactions, and tokens"

                />

            </Grid.Column>
        </Container>

    )
}

export default function TemplateModule(props) {
    const { api } = useSubstrateState()
    return api.query.templateModule && api.query.templateModule.something ? (
        <Main {...props} />
    ) : null
}
