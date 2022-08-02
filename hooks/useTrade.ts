import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";

import PoolABI from "../abis/Pool.json";
import useApprovalForAll from "./useApprovalForAll";

const useTrade = () => {

    const [selectedOwnedToken, setSelectedOwnedToken] = useState<number | null>(null);
    const [selectedPoolToken, setSelectedPoolToken] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { isApprovedForAll, approveForAll } = useApprovalForAll(process.env.NEXT_PUBLIC_POOL_ADDRESS);

    const { fetch } = useWeb3ExecuteFunction();

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

    const trade = async () => {
        await fetch({
            params: {
                contractAddress: process.env.NEXT_PUBLIC_POOL_ADDRESS,
                functionName: "TradeWithPool",
                abi: PoolABI,
                params: {
                    _ownedTokenId: selectedOwnedToken,
                    _desiredTokenId: selectedPoolToken,
                }
            }
        })
    }

    return {
        selectedOwnedToken,
        selectedPoolToken,
        isApprovedForAll,
        approveForAll,
        selectOwnedToken,
        unselectOwnedToken,
        selectPoolToken,
        unselectPoolToken,
        trade,
        errorMessage
    }
}

export default useTrade;