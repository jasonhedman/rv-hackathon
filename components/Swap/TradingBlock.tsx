import { FC } from 'react'

import { Heading, VStack, Text } from '@chakra-ui/react'
import useTradingBlock from '../../hooks/useTradingBlock'
import NFT from '../utilities/NFT';

const TradingBlock : FC = () => {

    const { listedTokens } = useTradingBlock();

    return (
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
                        />
                    ))
                ) : (
                    <Text>There are no NFTs listed on the trading block.</Text>
                )
            }
        </VStack>
    )
}

export default TradingBlock