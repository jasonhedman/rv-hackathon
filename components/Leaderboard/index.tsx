import { Heading, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'
import { useMoralisCloudFunction } from 'react-moralis'
import { Portfolio } from '../../hooks/types'
import PortfolioView from './PortfolioView'

const Leaderboard = () => {

    const { data, isFetching } = useMoralisCloudFunction("getPortfolioChanges")

    return (
        <VStack
            alignItems='flex-start'
        >
            <Heading>Leaderboard</Heading>
            <Skeleton
                isLoaded={!isFetching}
                variant='rectangular'
            >
                <VStack>
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
            </Skeleton>
        </VStack>
    )
}

export default Leaderboard