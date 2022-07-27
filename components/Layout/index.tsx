import { FC, ReactNode } from 'react'

import { Flex } from '@chakra-ui/react'

import Navbar from './Navbar'

interface Props {
    children: ReactNode;
}

const Layout : FC<Props> = ({ children }) => {

    return (
        <Flex
            minHeight='100vh'
            direction='column'
            position='relative'
        >
            <Navbar />
            { children }
        </Flex>
    )
}

export default Layout