import { Heading, Text, VStack, Button } from '@chakra-ui/react'
import { FC } from 'react'
import useDraft from '../../hooks/useDraft'
import NFT from '../utilities/NFT';

const Draft : FC = () => {

    const { ownedNFTs, withdraw } = useDraft();

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
                {
                    ownedNFTs.length > 0 ? (
                        ownedNFTs.map(nft => (
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