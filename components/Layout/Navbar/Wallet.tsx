import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text
} from '@chakra-ui/react'

import { getEllipsisTxt } from '../../../services/utils';
import useAuth, { connectors } from '../../../hooks/useAuth';

const Wallet = () => {

    const { address, connectWallet } = useAuth();

    return (
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
                            <MenuItem>
                                Disconnect
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            {
                                connectors.map(connector => (
                                    <MenuItem 
                                        key={connector.name}
                                        onClick={() => connectWallet(connector.connector)}
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
  )
}


        

export default Wallet