import { FC } from 'react'

import useAssetPrice from '../../hooks/useAssetPrice'

import { HStack, Text } from '@chakra-ui/react'
import { round2 } from '../../services/utils';

interface Props {
    symbol: string;
}

const AssetPrice : FC<Props> = ({ symbol }) => {

    const { assetInfo } = useAssetPrice(symbol);

    const changeColor = assetInfo.changePercent > 0 ? 'green.500' : 'red.500';

    return (
      <HStack>
          <Text>
            ${round2(assetInfo.price).toLocaleString()}
          </Text>
          <Text
            color={changeColor}
            fontSize={'sm'}
          >
            {assetInfo.changePercent > 0 && '+'}{round2(assetInfo.changePercent)}%
          </Text>
      </HStack>
    )
}

export default AssetPrice