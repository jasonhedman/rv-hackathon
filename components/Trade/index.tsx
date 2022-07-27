import { VStack } from '@chakra-ui/react';
import React from 'react'
import PoolNFTs from './PoolNFTs';
import YourNFTs from './YourNFTs';

const Trade = () => {

  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  if(!contractAddress) {
    return <div>No contract address</div>
  }

  return (
    <VStack>
      <YourNFTs 
        contractAddress={contractAddress}
      />
      <PoolNFTs
        contractAddress={contractAddress}
      />
    </VStack>
  )
}

export default Trade