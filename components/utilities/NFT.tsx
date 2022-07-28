import { FC } from 'react';

import {
    VStack,
    Image,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";

  import Card from "./Card";
    
  import { Token } from "../../hooks/types";
  
  interface Props {
    token: Token;
    actionButtons?: React.ReactNode;
    infoDisplay?: React.ReactNode
    width?: string;
    compact?: boolean
  }
  
  const NFT : FC<Props> = ({ token, actionButtons, infoDisplay, width, compact }) => {
  
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <Card>
            <VStack 
                spacing={4}
            >
                <Image
                    alt="NFT image"
                    src={token.image}
                    borderRadius='20px'
                    w={width || '100%'}
                />
                <VStack 
                    justify='space-between'
                    h='100%'
                    spacing={4}
                >
                    <Text
                        color={textColor}
                        fontSize={{
                            md: "lg",
                            "2xl": "xl",
                        }}
                        fontWeight='bold'
                        textAlign='center'
                    >
                        {compact ? token.symbol : token.name}
                    </Text>
                    {infoDisplay}
                    {actionButtons}
                </VStack>
            </VStack>
        </Card>
    );
}

export default NFT;