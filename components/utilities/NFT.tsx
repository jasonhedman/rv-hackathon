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
  }
  
  const NFT : FC<Props> = ({ token, actionButtons, infoDisplay }) => {
  
    const textColor = useColorModeValue("navy.700", "white");
    return (
        <Card>
            <VStack 
                spacing={4}
                h='100%'
            >
                <Image
                    alt="NFT image"
                    src={token.image}
                    w="100%"
                    h="100%"
                    borderRadius='20px'
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
                    >
                        {token.name}
                    </Text>
                    {infoDisplay}
                    {actionButtons}
                </VStack>
            </VStack>
        </Card>
    );
}

export default NFT;