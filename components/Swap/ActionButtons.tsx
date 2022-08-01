import { FC } from 'react'

import { HStack, Button } from '@chakra-ui/react';

interface Props {
    listed: boolean;
    listToken: () => void;
    unlistToken: () => void;
    createSwap: (desiredTokenId: number) => Promise<void>;
}

const ActionButtons : FC<Props> = ({ listed, listToken, unlistToken, createSwap }) => {
  return (
    <HStack>
        <Button
            onClick={listed ? unlistToken : listToken}
        >
            {listed ? "Unlist" : "List"}
        </Button>
        <Button
            onClick={() => createSwap(2)}
        >
            Swap
        </Button>
    </HStack>
  )
}

export default ActionButtons