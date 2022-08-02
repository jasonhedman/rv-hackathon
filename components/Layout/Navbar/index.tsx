import { FC } from 'react';

import { useRouter } from 'next/router';

import {
  Button,
  HStack,
  useColorMode,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import NavLink from './NavLink';
import Wallet from './Wallet';

import routes from './routes';

export const navbarHeight = '4rem';

const Navbar : FC = () => {

    const router = useRouter()

    const { colorMode, toggleColorMode } = useColorMode();
    const navbarBackground = useColorModeValue("secondaryGray.300", "navy.900");

    const isActive = (href: string) => {
        return router.pathname === href
    }

    return (
        <HStack
            h={navbarHeight}
            w='100%'
            position='fixed'
            justifyContent='space-between'
            px='1rem'
            bg={navbarBackground}
            opacity='1'
            zIndex={10}
        >
            <HStack
                spacing={8}
            >
                <Text
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                >
                    RV Hackathon
                </Text>
                <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ 
                        base: 'none', 
                        md: 'flex' 
                    }}
                >
                        {
                            routes.map(({ name, href }) => (
                                <NavLink 
                                    key={name}
                                    href={href}
                                    isActive={isActive(href)}
                                >
                                    {name}
                                </NavLink>
                            ))
                        }
                </HStack>
            </HStack>
            <HStack 
                direction={'row'} 
            >
                <Button 
                    onClick={toggleColorMode}
                    rounded='full'
                >
                    {
                        colorMode === 'light' ? (
                            <MoonIcon />
                        ) : (
                            <SunIcon />
                        )
                    }
                </Button>
                <Wallet />
            </HStack>
        </HStack>
    );
}

export default Navbar