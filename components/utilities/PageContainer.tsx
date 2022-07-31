import { FC, ReactNode } from 'react'

import { Container } from '@chakra-ui/react'

import { useChain } from 'react-moralis'

import useAuth from '../../hooks/useAuth'

import { navbarHeight } from '../Layout/Navbar'

import NotConnected from './NotConnected'
import WrongChain from './WrongChain'


interface Props {
    children: ReactNode
}

const PageContainer : FC<Props> = ({ children }) => {

    const { chain } = useChain();

    const { address } = useAuth();

    return (
        <Container
            flex={1}
            display='flex'
            flexDirection='column'
            py={navbarHeight}
            justifyContent='center'
            maxW='2xl'
        >
            {
                address ? (
                    (process.env.NEXT_PUBLIC_CHAIN_ID !== String(chain?.chainId)) ? (
                        <WrongChain />
                    ) : (
                        children
                    )
                ) : (
                    <NotConnected />
                )
            }
        </Container>
    )
}

export default PageContainer