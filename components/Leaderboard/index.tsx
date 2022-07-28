import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Portfolio } from '../../hooks/types'
import PortfolioView from './PortfolioView'

const portfolios : Portfolio[] = [
    {
        name: "Jason Hedman",
        tokenIds: [
            0,
            1, 
            2,
            3,
        ],
        change: -10,
        address: '0x7F73A55AC33b83683E25EB66F7778b88Ff33baF8'
    }
]

const Leaderboard = () => {
  return (
    <VStack
        alignItems='flex-start'
    >
        <Heading>Leaderboard</Heading>
        {
            portfolios.map((portfolio, index) => (
                <PortfolioView 
                    key={portfolio.name} 
                    portfolio={portfolio}
                    place={index + 1}
                />
            ))
        }
    </VStack>
  )
}

export default Leaderboard