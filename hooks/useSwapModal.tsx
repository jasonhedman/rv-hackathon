import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import useOwnedNFTs from "./useOwnedNFTs";

import SwapperABI from "../abis/Swapper.json";


const useSwapModal = (desiredTokenId : number) => {
    const  { account } = useMoralis();

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, String(account));

    const { fetch } = useWeb3ExecuteFunction();

    const createSwap = async (ownedTokenId : number) => {
        await fetch({
            params: {
                contractAddress: process.env.NEXT_PUBLIC_SWAPPER_ADDRESS,
                abi: SwapperABI,
                functionName: "depositForSwapping",
                params: {
                    _ownedTokenId: ownedTokenId,
                    _desiredTokenId: desiredTokenId,
                }
            }
        })
    }

    return {
        ownedNFTs,
        createSwap,
    }
}

export default useSwapModal;