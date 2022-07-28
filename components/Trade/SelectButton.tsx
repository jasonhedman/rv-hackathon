import { Button } from '@chakra-ui/react';
import { FC } from 'react'

interface Props {
    selected: boolean;
    selectToken: () => void;
    unselectToken: () => void;
}

const SelectButton : FC<Props> = ({ selected, selectToken, unselectToken}) => {
  return (
    <Button
        onClick={selected ? unselectToken : selectToken}
    >
        {selected ? "Selected" : "Select"}
    </Button>
  )
}

export default SelectButton