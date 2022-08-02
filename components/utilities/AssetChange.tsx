import { FC } from 'react'

import useAssetChange from '../../hooks/useAssetChange'

import { Text } from '@chakra-ui/react'
import { round } from '../../services/utils';

interface Props {
    symbol: string;
}

const AssetChange : FC<Props> = ({ symbol }) => {

    const { changePercent } = useAssetChange(symbol);

    const changeColor = changePercent > 0 ? 'green.500' : 'red.500';

    return (
      <Text
        color={changeColor}
        fontSize={'sm'}
      >
        {changePercent > 0 && '+'}{round(changePercent, 4)}%
      </Text>
    )
}

export default AssetChange