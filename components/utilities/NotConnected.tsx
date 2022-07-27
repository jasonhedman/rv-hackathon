import React from 'react'

import {
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'

const NotConnected = () => {

  return (
    <VStack spacing={1}>
      <Heading>
        Not Connected
      </Heading>
      <Text 
        variant='body1' 
        align='center'
      >
          You must connect your wallet to view this page.
      </Text>
    </VStack>
  )
}

export default NotConnected