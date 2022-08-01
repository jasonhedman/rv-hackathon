import { FC } from 'react'

import { Button } from '@chakra-ui/react'

interface Props {
    listed: boolean;
    listToken: () => void;
    unlistToken: () => void;
}

const ListButton : FC<Props> = ({ listed, listToken, unlistToken }) => {
    return (
        <Button
            onClick={listed ? unlistToken : listToken}
        >
            {listed ? "Unlist" : "List"}
        </Button>
    )
}

export default ListButton