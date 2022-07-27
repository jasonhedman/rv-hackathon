import React from 'react'

import {
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'

const TokenUnauthorized = () => {

  return (
    <VStack spacing={1}>
      <Heading>
        Token Gated
      </Heading>
      <Text 
        variant='body1' 
        align='center'
      >
        You must own a RVPC NFT to access this page.
      </Text>
    </VStack>
  )
}

export default TokenUnauthorized