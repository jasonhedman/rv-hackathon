import React from 'react'

import {
  VStack,
  Heading,
  Text,
  Button
} from '@chakra-ui/react'

import { useSwitchNetwork } from 'wagmi'

const WrongChain = () => {

    const { switchNetwork } = useSwitchNetwork();

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
                onClick={() => switchNetwork && switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "0"))}
            >
                Switch Network
            </Button>
        </VStack>
    )
}

export default WrongChain