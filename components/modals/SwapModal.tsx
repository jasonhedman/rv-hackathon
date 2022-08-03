import { FC } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
} from '@chakra-ui/react'

import useSwapModal from '../../hooks/useSwapModal';
import NFT from '../utilities/NFT';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    tokenId: number;
}

const SwapModal : FC<Props> = ({ isOpen, onClose, tokenId }) => {

    const { ownedNFTs, createSwap } = useSwapModal(tokenId);

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size='xl'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Swap for Token #{tokenId}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        ownedNFTs.length > 0 ? (
                            ownedNFTs.map(token => (
                                <NFT
                                    key={`${token.contractAddress}-${token.tokenId}`}
                                    token={token}
                                    compact
                                    actionButtons={
                                        <Button
                                            onClick={() => createSwap(token.tokenId)}
                                        >
                                            Swap
                                        </Button>
                                    }
                                />
                            ))
                        ) : (
                            <Text>You have no NFTs to swap</Text>
                        )
                    }

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SwapModal