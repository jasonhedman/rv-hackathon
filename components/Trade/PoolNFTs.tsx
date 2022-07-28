import { FC } from 'react'

import { Heading, SimpleGrid, VStack } from '@chakra-ui/react'

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
        </VStack>
    )
}

export default PoolNFTs