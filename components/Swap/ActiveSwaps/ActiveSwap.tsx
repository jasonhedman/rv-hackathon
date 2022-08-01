import { FC } from 'react'

import { HStack, Text } from '@chakra-ui/react'

import { Swap } from '../../../hooks/types'
import NFT from '../../utilities/NFT';

interface Props {
    swap: Swap;
}

const ActiveSwap : FC<Props> = ({ swap }) => {
  return (
    <HStack>
        <NFT
            token={swap.tokenStaked}
            compact
        />
        <Text>
            for
        </Text>
        <NFT
            token={swap.tokenWanted}
            compact
        />
    </HStack>
  )
}

export default ActiveSwap