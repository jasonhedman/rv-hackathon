import { FC, useState } from 'react'

import { Heading, VStack, Text, Button, useDisclosure } from '@chakra-ui/react'
import useTradingBlock from '../../hooks/useTradingBlock'
import NFT from '../utilities/NFT';
import SwapModal from '../modals/SwapModal';

const TradingBlock : FC = () => {

    const { onOpen, isOpen, onClose } = useDisclosure();

    const [selectedTokenId, setSelectedTokenId] = useState<number>(0);

    const { listedTokens } = useTradingBlock();

    const handleOpen = (tokenId : number) => {
        setSelectedTokenId(tokenId);
        onOpen();
    }

    return (
        <>
            <SwapModal 
                isOpen={isOpen}
                onClose={onClose}
                tokenId={selectedTokenId}
            />
            <VStack
                w='100%'
                spacing={4}
            >
                <Heading>Trading Block</Heading>
                <Text>Tokens listed by users for trade.</Text>
                {
                    listedTokens.length > 0 ? (
                        listedTokens.map(token => (
                            <NFT 
                                key={`${token.contractAddress}-${token.tokenId}`}
                                token={token}
                                username={token.username}
                                actionButtons={
                                    <Button
                                        onClick={() => handleOpen(token.tokenId)}
                                    >
                                        Create Swap
                                    </Button>
                                }
                            />
                        ))
                    ) : (
                        <Text>There are no NFTs listed on the trading block.</Text>
                    )
                }
            </VStack>
        </>
    )
}

export default TradingBlock