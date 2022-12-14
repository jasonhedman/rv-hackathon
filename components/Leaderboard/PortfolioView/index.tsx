import { useState, FC } from 'react'

import { Text, VStack, HStack, Box, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

import Card from '../../utilities/Card'
import TokensPreview from './TokensPreview'

import { getEllipsisTxt } from '../../../services/utils'

import { Portfolio } from '../../../hooks/types'

interface Props {
    portfolio: Portfolio;
    place: number;
}

const colors : {[key: string]: string} = {
    "1": 'green.500',
    "2": 'green.400',
    "3": 'green.300'
}

const PortfolioView : FC<Props> = ({ portfolio, place }) => {


    const [isOpen, setIsOpen] = useState<boolean>(false);

    const changeColor = portfolio.changePercent > 0 ? 'green.500' : portfolio.changePercent < 0 ? 'red.500' : 'gray.500';

    return (
        <Card
            w='100%'
            display='flex'
            flexDirection='column'
            gap={4}
        >
            <HStack
                spacing={4}
            >
                <Box
                    h='40px'
                    w='40px'
                    borderRadius='50%'
                    bg={colors[String(place)] || 'grey.400'}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                >
                    <Text
                        color={colors[String(place)] ? 'white' : 'grey.500'}
                    >
                        {place}
                    </Text>
                </Box>
                <VStack
                    alignItems='flex-start'
                >
                    {portfolio.username !== portfolio.userAddress && (
                        <Text
                            fontSize='lg'
                            fontWeight='bold'
                        >
                            {portfolio.username}
                        </Text>
                    )}
                    <Text>{getEllipsisTxt(portfolio.userAddress, 5)}</Text>
                </VStack>
                <Box flex={1}/>
                <Text
                    color={changeColor}
                    fontWeight='bold'
                >
                    {portfolio.changePercent > 0 && "+"}{portfolio.changePercent}%
                </Text>
                <IconButton
                    aria-label='Show/Hide Tokens'
                    onClick={() => setIsOpen(!isOpen)}
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                />
            </HStack>
            {
                isOpen && (
                    <TokensPreview 
                        address={portfolio.userAddress}
                    />
                )
            }
        </Card>
    )
}

export default PortfolioView