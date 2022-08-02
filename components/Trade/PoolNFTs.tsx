import { useState, FC } from 'react'

import { Heading, VStack, Text, Skeleton, Input } from '@chakra-ui/react'

import usePoolNFTs from '../../hooks/usePoolNFTs';

import NFT from '../utilities/NFT';
import SelectButton from './SelectButton';

interface Props {
    contractAddress: string;
    selectedToken: number | null;
    selectToken: (tokenId : number) => void;
    unselectToken: (tokenId : number) => void;
}

const PoolNFTs : FC<Props> = ({ contractAddress, selectedToken, selectToken, unselectToken }) => {

    const { ownedNFTs, loading } = usePoolNFTs(contractAddress);

    const [filter, setFilter] = useState('');

    return (
        <VStack
            spacing={4}
            w='100%'
        >
            <Heading>Pool NFTs</Heading>
            <Skeleton
                isLoaded={!loading}
                w='100%'
            >
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
                                        compact
                                        actionButtons={
                                            <SelectButton 
                                                selected={selectedToken === nft.tokenId}
                                                selectToken={() => selectToken(nft.tokenId)}
                                                unselectToken={() => unselectToken(nft.tokenId)}
                                            />
                                        }
                                    />
                                ))
                        ) : (
                            <Text>The pool does not own any NFTs from this collection</Text>
                        )
                    }
                </VStack>
            </Skeleton>
        </VStack>
    )
}

export default PoolNFTs