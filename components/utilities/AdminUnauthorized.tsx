import React from 'react'

import {
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'

const AdminUnathorized = () => {

  return (
    <VStack spacing={1}>
      <Heading>
        Unauthorized
      </Heading>
      <Text 
        variant='body1' 
        align='center' 
      >
          You must be an admin to access this page.
      </Text>
    </VStack>
  )
}

export default AdminUnathorized