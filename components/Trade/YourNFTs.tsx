import { FC } from 'react'

import { Heading, SimpleGrid, VStack, Text, Button } from '@chakra-ui/react'

import useUserNFTs from '../../hooks/useUserNFTs';
import NFT from '../utilities/NFT';
import useSwap from '../../hooks/useSwap';
import SelectButton from './SelectButton';

interface Props {
    contractAddress: string;
    selectedTokens: number[];
    selectToken: (tokenId : number) => void;
    unselectToken: (tokenId : number) => void;
    swap: () => void
}

const YourNFTs : FC<Props> = ({ contractAddress, selectedTokens, selectToken, unselectToken, swap }) => {

    const { ownedNFTs } = useUserNFTs(contractAddress);

    return (
        <VStack
            spacing={4}
        >
            <Heading>Your NFTs</Heading>
            {
                ownedNFTs.length > 0 ? (
                    <>
                        <SimpleGrid
                            columns={3}
                            spacing={2}
                        >
                            {
                                ownedNFTs.map(nft => (
                                    <NFT 
                                        key={`${nft.contractAddress}-${nft.tokenId}`}
                                        token={nft}
                                        actionButtons={
                                            <SelectButton 
                                                selected={selectedTokens.includes(nft.tokenId)}
                                                selectToken={() => selectToken(nft.tokenId)}
                                                unselectToken={() => unselectToken(nft.tokenId)}
                                            />
                                        }
                                    />
                                ))
                            }
                        </SimpleGrid>
                        <Button
                            variant='solid'
                            colorScheme='brand'
                            onClick={swap}
                        >
                            Swap
                        </Button>
                    </>
                ) : (
                    <Text>You do not own any NFTs from this collection.</Text>
                )
            }
        </VStack>
    )
}

export default YourNFTs