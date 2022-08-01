import { VStack } from '@chakra-ui/react';
import { FC } from 'react'
import useTrade from '../../hooks/useTrade';
import PoolNFTs from './PoolNFTs';
import YourNFTs from './YourNFTs';

interface Props {
  contractAddress: string;
}

const Trade : FC<Props> = ({ contractAddress }) => {

  const {
    selectedOwnedTokens,
    selectedPoolTokens,
    errorMessage,
    selectOwnedToken,
    unselectOwnedToken,
    selectPoolToken,
    unselectPoolToken,
    trade
  } = useTrade();

  return (
    <VStack
      spacing={8}
    >
      <YourNFTs 
        contractAddress={contractAddress}
        selectedTokens={selectedOwnedTokens}
        selectToken={selectOwnedToken}
        unselectToken={unselectOwnedToken}
        errorMessage={errorMessage}
        trade={trade}
      />
      <PoolNFTs
        contractAddress={contractAddress}
        selectedTokens={selectedPoolTokens}
        selectToken={selectPoolToken}
        unselectToken={unselectPoolToken}
      />
    </VStack>
  )
}

export default Trade