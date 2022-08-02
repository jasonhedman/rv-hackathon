import { useEffect, useState } from "react";

const useTrade = () => {

    const [selectedOwnedToken, setSelectedOwnedToken] = useState<number | null>(null);
    const [selectedPoolToken, setSelectedPoolToken] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("");

    const selectOwnedToken = (tokenId : number ) => {
        setSelectedOwnedToken(tokenId);
    }

    const unselectOwnedToken = (tokenId : number) => {
        setSelectedOwnedToken(null);
    }


    const selectPoolToken = (tokenId : number ) => {
        setSelectedPoolToken(tokenId);
    }

    const unselectPoolToken = (tokenId : number) => {
        setSelectedPoolToken(null)
    }

    useEffect(() => {
        if(selectedOwnedToken === null) {
            setErrorMessage("Select a token to trade");
        } else if(selectedPoolToken === null) {
            setErrorMessage("Select a token to receive");
        } else {
            setErrorMessage("");
        }
    }, [selectedOwnedToken, selectedPoolToken]);

    const trade = () => {
        console.log(selectedPoolToken, selectedOwnedToken);
    }

    return {
        selectedOwnedToken,
        selectedPoolToken,
        selectOwnedToken,
        unselectOwnedToken,
        selectPoolToken,
        unselectPoolToken,
        trade,
        errorMessage
    }
}

export default useTrade;