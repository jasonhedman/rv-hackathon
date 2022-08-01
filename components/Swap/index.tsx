import React from 'react'

import { VStack } from '@chakra-ui/react'
import UserNFTs from './UserNFTs'
import TradingBlock from './TradingBlock'

const SwapComponent = () => {
  return (
    <VStack
      spacing={8}
    >
        <UserNFTs />
        <TradingBlock />
    </VStack>
  )
}

export default SwapComponent