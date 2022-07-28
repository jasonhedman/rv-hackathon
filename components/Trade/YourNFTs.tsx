import { FC } from 'react'

import { Heading, SimpleGrid, VStack, Text } from '@chakra-ui/react'

import useUserNFTs from '../../hooks/useUserNFTs';
import NFT from '../utilities/NFT';

interface Props {
    contractAddress: string
}

const YourNFTs : FC<Props> = ({ contractAddress }) => {

    const { ownedNFTs } = useUserNFTs(contractAddress);

    return (
        <VStack>
            <Heading>Your NFTs</Heading>
            {
                ownedNFTs.length > 0 ? (
                    <SimpleGrid
                        columns={3}
                        spacing={2}
                    >
                        {
                            ownedNFTs.map(nft => (
                                <NFT 
                                    key={`${nft.contractAddress}-${nft.tokenId}`}
                                    token={nft}
                                />
                            ))
                        }
                    </SimpleGrid>
                ) : (
                    <Text>You do not own any NFTs from this collection.</Text>
                )
            }
        </VStack>
    )
}

export default YourNFTs