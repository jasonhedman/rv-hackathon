import { FC } from 'react'

import { Heading, SimpleGrid, VStack } from '@chakra-ui/react'

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
            <SimpleGrid
                columns={3}
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

export default YourNFTs