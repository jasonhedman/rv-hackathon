import { FC } from 'react'

import { Heading, VStack, Text, Skeleton } from '@chakra-ui/react'

import useUserNFTs from '../../hooks/useUserNFTs';
import useList from '../../hooks/useList';

import NFT from '../utilities/NFT';
import ListButton from './ListButton';


const UserNFTs : FC = ({ }) => {

    const { ownedNFTs, loading } = useUserNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS);

    const { list, unlist, listedTokens } = useList();

    return (
        <VStack
            spacing={4}
            w='100%'
        >
            <Heading>Your NFTs</Heading>
            <Text
                textAlign='center'
            >
                List your NFTs on the trading block, letting other players know you would like to trade an asset.
            </Text>
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
                            ownedNFTs.map(nft => (
                                <NFT 
                                    key={`${nft.contractAddress}-${nft.tokenId}`}
                                    token={nft}
                                    width='40px'
                                    actionButtons={
                                        <ListButton 
                                            listed={Boolean(listedTokens.find((val) => nft.tokenId == val.tokenId))}
                                            listToken={() => list(nft.tokenId)}
                                            unlistToken={() => unlist(nft.tokenId)}
                                        />
                                    }
                                />
                            ))
                        ) : (
                            <Text>You do not own any NFTs from this collection.</Text>
                        )
                    }
                </VStack>
            </Skeleton>
        </VStack>
    )
}

export default UserNFTs