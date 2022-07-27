import React from 'react'

import { Link, Text } from "@chakra-ui/react"

interface Props {
    symbol: string,
    slug: string,
}

const TokenSymbol : React.FC<Props> = ({ symbol, slug }) => {
    return (
        <Link 
            href={`https://coinmarketcap.com/currencies/${slug}/`}
        >
            <Text
                opacity={0.8}
                _hover={{
                    opacity: 0.5,
                }}
            >
                {symbol}
            </Text>
        </Link>
    )
}

export default TokenSymbol