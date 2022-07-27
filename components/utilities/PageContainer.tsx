import { FC, ReactNode } from 'react'

import { Container } from '@chakra-ui/react'

import { useNetwork, useSwitchNetwork } from 'wagmi'

import useAuth from '../../hooks/useAuth'

import { navbarHeight } from '../Layout/Navbar'

import NotConnected from './NotConnected'
import WrongChain from './WrongChain'

interface Props {
    children: ReactNode
}

const PageContainer : FC<Props> = ({ children }) => {

    const { chain } = useNetwork();

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
                    (process.env.NEXT_PUBLIC_CHAIN_ID !== String(chain?.id)) ? (
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