import { FC, ReactNode } from 'react'

import { Container } from '@chakra-ui/react'

import useAuth from '../../hooks/useAuth'

import { navbarHeight } from '../Layout/Navbar'
import NotConnected from './NotConnected'

interface Props {
    children: ReactNode
}

const PageContainer : FC<Props> = ({ children }) => {

    const { address } = useAuth();

    return (
        <Container
            flex={1}
            display='flex'
            flexDirection='column'
            py={navbarHeight}
            justifyContent='center'
        >
            {
                address ? (
                    children
                ) : (
                    <NotConnected />
                )
            }
        </Container>
    )
}

export default PageContainer