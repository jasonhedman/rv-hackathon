import { useState } from "react";

const useSwap = () => {
    
    const [selectedOwnedTokens, setSelectedOwnedTokens] = useState<number[]>([])

    const selectOwnedToken = (tokenId : number ) => {
        setSelectedOwnedTokens([...selectedOwnedTokens, tokenId]);
    }

    const unselectOwnedToken = (tokenId : number) => {
        setSelectedOwnedTokens(selectedOwnedTokens.filter(token => token !== tokenId))
    }

    const [selectedPoolTokens, setSelectedPoolTokens] = useState<number[]>([])

    const selectPoolToken = (tokenId : number ) => {
        setSelectedPoolTokens([...selectedPoolTokens, tokenId]);
    }

    const unselectPoolToken = (tokenId : number) => {
        setSelectedPoolTokens(selectedPoolTokens.filter(token => token !== tokenId))
    }

    const swap = () => {
        console.log(selectedOwnedTokens);
    }

    return {
        selectedOwnedTokens,
        selectOwnedToken,
        unselectOwnedToken,
        selectedPoolTokens,
        selectPoolToken,
        unselectPoolToken,
        swap
    }
}

export default useSwap;