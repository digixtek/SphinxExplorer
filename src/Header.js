import React from "react"
import {
    Menu,
    Container,
    Image,
} from 'semantic-ui-react'
export default function Main(props) {
    return (
        <Menu
            attached="top"
            tabular
            className='bg-light-gray'
            style={{
                paddingTop: '1em',
                paddingBottom: '1em',
            }}
        >
            <Container>
                <Menu.Menu>
                    <Image
                        src={`${process.env.PUBLIC_URL}/assets/sphinx-logo-white.png`}
                        className='header-image-logo'
                    />
                </Menu.Menu>
                <Menu.Menu position="right" className="nav-masthead" style={{ alignItems: 'center' }}>
                    <a aria-current="page" href="/" className="nav-link active">Home</a>
                    <a href="/blocks" className="nav-link">Blocks</a>
                    <a href="/transactions" className="nav-link">Transactions</a>
                </Menu.Menu>
            </Container>
        </Menu>
    )
    
}
