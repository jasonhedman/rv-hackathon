import { useState, FC } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input
} from '@chakra-ui/react'
import useSetUsername from '../../hooks/useSetUsername';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const UsernameModal : FC<Props> = ({ isOpen, onClose}) => {

    const { username, handleChange, onSubmit } = useSetUsername();

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Edit Username
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input 
                        placeholder='Username'
                        value={username}
                        onChange={handleChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='ghost' 
                        mr={3} 
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button 
                        variant='brand'
                        onClick={async () => {await onSubmit(); onClose();}}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UsernameModal