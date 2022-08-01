import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text,
    useDisclosure
} from '@chakra-ui/react'

import { getEllipsisTxt } from '../../../services/utils';
import useAuth, { connectors } from '../../../hooks/useAuth';

import UsernameModal from '../../modals/UsernameModal';

const Wallet = () => {

    const { address, connectWallet } = useAuth();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <UsernameModal 
                isOpen={isOpen}
                onClose={onClose}
            />
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'solid'}
                    cursor={'pointer'}
                    minW={0}
                >
                    {address 
                        ? <Text id='account'>{getEllipsisTxt(address)}</Text>
                        : <Text id='connect'>{("Connect Wallet")}</Text>
                    }
                </MenuButton>
                <MenuList alignItems={'center'}>
                    {
                        address ? (
                            <>
                                <MenuItem
                                    onClick={() => onOpen()}
                                >
                                    Edit Profile
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                {
                                    connectors.map(connector => (
                                        <MenuItem 
                                            key={connector.name}
                                            onClick={() => connectWallet(connector)}
                                        >
                                            {connector.name}
                                        </MenuItem>
                                    ))
                                }
                            </>
                        )
                    }
                    
                </MenuList>
            </Menu>
        </>
  )
}


        

export default Wallet