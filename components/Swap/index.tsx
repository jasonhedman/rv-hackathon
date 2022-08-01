import React from 'react'

import { VStack } from '@chakra-ui/react'
import UserNFTs from './UserNFTs'
import TradingBlock from './TradingBlock'
import ActiveSwaps from './ActiveSwaps'

const SwapComponent = () => {
  return (
    <VStack
      spacing={8}
    >
        <UserNFTs />
        <TradingBlock />
        <ActiveSwaps />
    </VStack>
  )
}

export default SwapComponent