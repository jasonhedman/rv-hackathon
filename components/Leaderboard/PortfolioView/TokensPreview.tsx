import { FC } from 'react'

import { VStack, HStack, Text } from '@chakra-ui/react'

import TokenRow from './TokenRow';

import useOwnedNFTs from '../../../hooks/useOwnedNFTs';

interface Props {
    address: string;
}

const TokensPreview : FC<Props> = ({ address }) => {

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, address);

    return (
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
    )
}

export default TokensPreview