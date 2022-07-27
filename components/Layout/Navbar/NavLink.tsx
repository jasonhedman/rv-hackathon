import { FC, ReactNode } from 'react';

import { useColorModeValue, Link } from '@chakra-ui/react';

interface NavLinkProps {
    children: ReactNode;
    href: string;
    isActive?: boolean;
}

const NavLink : FC<NavLinkProps> = ({ children, href, isActive }) => {
    const activeBg = useColorModeValue('gray.200', 'gray.700')
    return (
        <Link
            px={2}
            py={1}
            rounded={'md'}
            bg={isActive ? activeBg : 'transparent'}
            _hover={{
            textDecoration: 'none',
            bg: activeBg,
            }}
            href={href}
        >
            {children}
        </Link>
    )
};

export default NavLink;