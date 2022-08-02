import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { Portfolio } from '../../hooks/types'
import PortfolioView from './PortfolioView'

const Leaderboard = () => {

    const { data } = useMoralisCloudFunction("getPortfolioChanges")

    return (
        <VStack
            alignItems='flex-start'
        >
            <Heading>Leaderboard</Heading>
            {
                ((data || []) as Portfolio[]).map((portfolio, index) => (
                    <PortfolioView 
                        key={portfolio.userAddress} 
                        portfolio={portfolio}
                        place={index + 1}
                    />
                ))
            }
        </VStack>
    )
}

export default Leaderboard