import { FC } from 'react';

import {
    Image,
    Text,
    useColorModeValue,
    HStack,
    Box
  } from "@chakra-ui/react";

  import Card from "../Card";
    
  import { Token } from "../../../hooks/types";
import AssetPrice from '../AssetPrice';
  
  interface Props {
    token: Token;
    actionButtons?: React.ReactNode;
    width?: string;
  }
  
  const NFT : FC<Props> = ({ token, actionButtons, width }) => {
  
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <Card
            w='100%'
        >
            <HStack 
                spacing={4}
            >
                <Image
                    alt="NFT image"
                    src={token.image}
                    borderRadius='20px'
                    w={width || '20px'}
                />
                <Text
                    color={textColor}
                    fontWeight='bold'
                    textAlign='center'
                >
                    {token.name} ({token.symbol})
                </Text>
                <Box 
                    flex={1}
                />
                <AssetPrice
                    symbol={token.symbol}
                />
                {actionButtons}
            </HStack>
        </Card>
    );
}

export default NFT;