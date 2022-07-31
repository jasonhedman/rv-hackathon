import { useEffect, useState } from "react";

const useSwap = () => {
    
    const [selectedOwnedTokens, setSelectedOwnedTokens] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const selectOwnedToken = (tokenId : number ) => {
        setSelectedOwnedTokens([...selectedOwnedTokens, tokenId]);
    }

    const unselectOwnedToken = (tokenId : number) => {
        setSelectedOwnedTokens(selectedOwnedTokens.filter(id => id !== tokenId));
    }

    const [selectedPoolTokens, setSelectedPoolTokens] = useState<number[]>([])

    const selectPoolToken = (tokenId : number ) => {
        setSelectedPoolTokens([...selectedPoolTokens, tokenId]);
    }

    const unselectPoolToken = (tokenId : number) => {
        setSelectedPoolTokens(selectedPoolTokens.filter(token => token !== tokenId))
    }

    useEffect(() => {
        if(selectedOwnedTokens.length === 0) {
            setErrorMessage("Please select at least one token");
        } else if(selectedOwnedTokens.length > 3) {
            setErrorMessage("Please select at most 3 tokens");
        } else if(selectedOwnedTokens.length !== selectedPoolTokens.length) {
            setErrorMessage("You must swap an equal number of tokens");
        } else {
            setErrorMessage("");
        }
    }, [selectedOwnedTokens, selectedPoolTokens]);

    const swap = () => {
        console.log(selectedOwnedTokens, selectedPoolTokens);
    }

    return {
        selectedOwnedTokens,
        selectOwnedToken,
        unselectOwnedToken,
        selectedPoolTokens,
        selectPoolToken,
        unselectPoolToken,
        swap,
        errorMessage
    }
}

export default useSwap;