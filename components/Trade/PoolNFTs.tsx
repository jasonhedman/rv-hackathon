import { FC } from 'react'

import { Heading, SimpleGrid, VStack, Text } from '@chakra-ui/react'

import usePoolNFTs from '../../hooks/usePoolNFTs';

import NFT from '../utilities/NFT';

interface Props {
    contractAddress: string
}

const PoolNFTs : FC<Props> = ({ contractAddress }) => {

    const { ownedNFTs } = usePoolNFTs(contractAddress);

    return (
        <VStack>
            <Heading>Pool NFTs</Heading>
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
                    <Text>The pool does not own any NFTs from this collection</Text>
                )
            }
            
        </VStack>
    )
}

export default PoolNFTs