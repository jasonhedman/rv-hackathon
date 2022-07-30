import { FC } from 'react'

import { VStack, HStack, Text, Skeleton } from '@chakra-ui/react'

import TokenRow from './TokenRow';

import useOwnedNFTs from '../../../hooks/useOwnedNFTs';

interface Props {
    address: string;
}

const TokensPreview : FC<Props> = ({ address }) => {

    const { ownedNFTs, loading } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, address);

    return (
        <Skeleton
            isLoaded={!loading}
        >
            <HStack
                justifyContent='center'
                w='100%'
            >
                <VStack
                    flex={1}
                >
                    {
                        ownedNFTs.length > 0 ? (
                            ownedNFTs.map(nft => (
                                <TokenRow
                                    key={`${nft.contractAddress}-${nft.tokenId}`}
                                    token={nft}
                                />
                            ))
                        ) : (
                            <Text>No Tokens</Text>
                        )
                    }
                </VStack>
            </HStack>
        </Skeleton>
    )
}

export default TokensPreview