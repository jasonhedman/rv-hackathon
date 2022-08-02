import { useState, FC } from 'react'

import { Heading, Text, VStack, Button, Input } from '@chakra-ui/react'

import NFT from '../utilities/NFT';

import useDraft from '../../hooks/useDraft'

const Draft : FC = () => {

    const { ownedNFTs, withdraw } = useDraft();

    const [filter, setFilter] = useState('');

    return (
        <VStack
            w='100%'
            spacing={8}
        >
            <Heading>
                Draft
            </Heading>
            <VStack
                w='100%'
            >
                <Input 
                    placeholder='Symbol'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                {
                    ownedNFTs.length > 0 ? (
                        ownedNFTs
                            .filter(nft => filter === '' || nft.symbol.toLowerCase().includes(filter.toLowerCase()))
                            .map(nft => (
                                <NFT 
                                    key={`${nft.contractAddress}-${nft.tokenId}`}
                                    token={nft}
                                    actionButtons={
                                        <Button
                                            onClick={() => withdraw(nft.tokenId)}
                                        >
                                            Draft
                                        </Button>
                                    }
                                    compact
                                />
                            ))
                    ) : (
                        <Text>
                            There are no NFTs to draft.
                        </Text>
                    )
                }
            </VStack>
        </VStack>
    )
}

export default Draft