import { FC } from 'react'

import { Heading, VStack, Text, Button, Skeleton } from '@chakra-ui/react'

import useUserNFTs from '../../hooks/useUserNFTs';

import NFT from '../utilities/NFT';
import SelectButton from './SelectButton';

interface Props {
    contractAddress: string;
    selectedTokens: number[];
    errorMessage: string;
    selectToken: (tokenId : number) => void;
    unselectToken: (tokenId : number) => void;
    trade: () => void
}

const YourNFTs : FC<Props> = ({ contractAddress, selectedTokens, errorMessage, selectToken, unselectToken, trade }) => {

    const { ownedNFTs, loading } = useUserNFTs(contractAddress);

    return (
        <VStack
            spacing={4}
            w='100%'
        >
            <Heading>Your NFTs</Heading>
            <Skeleton
                isLoaded={!loading}
                w='100%'
            >
                <VStack
                    spacing={4}
                    w='100%'
                >
                    {
                        ownedNFTs.length > 0 ? (
                            <>
                                {
                                    ownedNFTs.map(nft => (
                                        <NFT 
                                            key={`${nft.contractAddress}-${nft.tokenId}`}
                                            token={nft}
                                            width='40px'
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
                                <VStack>
                                    <Button
                                        variant='solid'
                                        colorScheme='brand'
                                        onClick={trade}
                                        disabled={errorMessage.length > 0}
                                    >
                                        Swap
                                    </Button>
                                    {errorMessage && (
                                        <Text
                                            color='red.700'
                                        >
                                            {errorMessage}
                                        </Text>
                                    )}
                                </VStack>
                            </>
                        ) : (
                            <Text>You do not own any NFTs from this collection.</Text>
                        )
                    }
                </VStack>
            </Skeleton>
        </VStack>
    )
}

export default YourNFTs