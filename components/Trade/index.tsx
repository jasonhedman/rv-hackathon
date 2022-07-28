import { VStack } from '@chakra-ui/react';
import { FC } from 'react'
import useSwap from '../../hooks/useSwap';
import PoolNFTs from './PoolNFTs';
import YourNFTs from './YourNFTs';

interface Props {
  contractAddress: string;
}

const Trade : FC<Props> = ({ contractAddress }) => {

  const {
    selectedOwnedTokens,
    selectOwnedToken,
    unselectOwnedToken,
    swap
  } = useSwap();

  return (
    <VStack
      spacing={8}
    >
      <YourNFTs 
        contractAddress={contractAddress}
        selectedTokens={selectedOwnedTokens}
        selectToken={selectOwnedToken}
        unselectToken={unselectOwnedToken}
        swap={swap}
      />
      <PoolNFTs
        contractAddress={contractAddress}
      />
    </VStack>
  )
}

export default Trade