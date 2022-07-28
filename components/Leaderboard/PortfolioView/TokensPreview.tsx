import { FC } from 'react'

import { HStack, Text } from '@chakra-ui/react'

import NFT from '../../utilities/NFT';

import useOwnedNFTs from '../../../hooks/useOwnedNFTs';

interface Props {
    address: string;
}

const TokensPreview : FC<Props> = ({ address }) => {

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, address);

    return (
        <HStack
            justifyContent='center'
        >
            <HStack>
                {
                    ownedNFTs.length > 0 ? (
                        ownedNFTs.map(nft => (
                            <NFT
                                key={`${nft.contractAddress}-${nft.tokenId}`}
                                token={nft}
                                width='75px'
                            />
                        ))
                    ) : (
                        <Text>No Tokens</Text>
                    )
                }
            </HStack>
        </HStack>
    )
}

export default TokensPreview