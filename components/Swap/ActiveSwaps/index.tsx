import React from 'react'

import { VStack, Heading, Text } from '@chakra-ui/react'

import ActiveSwap from './ActiveSwap'

import useActiveSwaps from '../../../hooks/useActiveSwaps'

const ActiveSwaps = () => {

    const { activeSwaps } = useActiveSwaps();

    return (
        <VStack
            spacing={4}
        >
            <Heading>Active Swaps</Heading>
            <Text>
                Current swaps that are in progress
            </Text>
            {
                activeSwaps.length > 0 ? (
                    activeSwaps.map(swap => (
                        <ActiveSwap
                            key={`${swap.tokenStaked.contractAddress}-${swap.tokenStaked.tokenId}`}
                            swap={swap}
                        />
                    ))
                ) : (
                    <Text>There are no active swaps</Text>
                )
            }
        </VStack>
    )
}

export default ActiveSwaps