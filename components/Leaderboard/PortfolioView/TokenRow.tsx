import { FC } from 'react'

import { Box, HStack, Image, Text } from '@chakra-ui/react'

import { Token } from '../../../hooks/types'
import AssetPrice from '../../utilities/AssetPrice';

interface Props {
    token: Token;
}

const TokenRow : FC<Props> = ({ token }) => {
  return (
    <HStack
        w='100%'
        spacing={4}
    >
        <Image
            alt="NFT image"
            src={token.image}
            w='40px'
            borderRadius='8px'
        />
        <Text
            fontWeight='bold'
        >
            {token.name} ({token.symbol})
        </Text>
        <Box 
            flex={1}
        />
        <AssetPrice 
            symbol={token.symbol}
        />
    </HStack>
  )
}

export default TokenRow