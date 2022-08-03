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
import AssetChange from '../AssetChange';
  
  interface Props {
    token: Token;
    actionButtons?: React.ReactNode;
    width?: string;
    compact?: boolean;
    username?: string;
  }
  
  const NFT : FC<Props> = ({ token, actionButtons, width, compact, username }) => {
  
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
                <Box>
                    <Text
                        color={textColor}
                        fontWeight='bold'
                    >
                        {token.name} ({token.symbol})
                    </Text>
                    <Text>
                        Token #{token.tokenId}
                    </Text>
                    {
                        username && (
                            <Text
                                fontWeight='bold'
                            >
                                {username}
                            </Text>
                        )
                    }
                </Box>
                <Box 
                    flex={1}
                />
                {
                    !compact && (
                        <AssetChange
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