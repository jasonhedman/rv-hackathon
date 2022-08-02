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
    selectedOwnedToken,
    selectedPoolToken,
    errorMessage,
    isApprovedForAll,
    approveForAll,
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
        selectedToken={selectedOwnedToken}
        selectToken={selectOwnedToken}
        unselectToken={unselectOwnedToken}
        errorMessage={errorMessage}
        isApprovedForAll={Boolean(isApprovedForAll)}
        approveForAll={approveForAll}
        trade={trade}
      />
      <PoolNFTs
        contractAddress={contractAddress}
        selectedToken={selectedPoolToken}
        selectToken={selectPoolToken}
        unselectToken={unselectPoolToken}
      />
    </VStack>
  )
}

export default Trade