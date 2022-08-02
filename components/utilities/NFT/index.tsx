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
    compact?: boolean;
  }
  
  const NFT : FC<Props> = ({ token, actionButtons, width, compact }) => {
  
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <Card
            w='100%'
        >
            <HStack 
                spacing={4}
            >
                {
                    !compact && (
                        <Image
                            alt="NFT image"
                            src={token.image}
                            borderRadius='8px'
                            w={width || '40px'}
                        />
                    )
                }
                <Text
                    color={textColor}
                    fontWeight='bold'
                >
                    {token.name} ({token.symbol})
                </Text>
                <Box 
                    flex={1}
                />
                {
                    !compact && (
                        <AssetPrice
                            symbol={token.symbol}
                        />
                    )
                }
                {actionButtons}
            </HStack>
        </Card>
    );
}

export default NFT;