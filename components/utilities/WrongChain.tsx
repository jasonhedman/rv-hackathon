import React from 'react'

import {
  VStack,
  Heading,
  Text,
  Button
} from '@chakra-ui/react'

import { useChain } from 'react-moralis'

const WrongChain = () => {

    const { switchNetwork } = useChain();

    return (
        <VStack spacing={4}>
            <Heading>
                Incorrect Network
            </Heading>
            <Text 
                align='center' 
            >
                You must be on the correct network to access this page.
            </Text>
            <Button
                variant='solid'
                colorScheme='brand'
                onClick={() => switchNetwork(process.env.NEXT_PUBLIC_CHAIN_ID)}
            >
                Switch Network
            </Button>
        </VStack>
    )
}

export default WrongChain