import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { getLink } from "../services/ipfs";

import useOwnedNFTs from "./useOwnedNFTs";

import { Swap, Attribute } from "./types";

import SwapperABI from "../abis/Swapper.json";
import { parseMetadata } from "../services/metadata";

const useActiveSwaps = () => {

    const { Moralis } = useMoralis();

    const [activeSwaps, setActiveSwaps] = useState<Swap[]>([]);

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, process.env.NEXT_PUBLIC_SWAPPER_ADDRESS);
    

    useEffect(() => {
        const getActiveSwaps = async () => {
            const swapstrings = await Promise.all(ownedNFTs.map(async (nft) => {
                const swapstring = await Moralis.Web3API.native.runContractFunction({
                    chain: 'rinkeby',
                    address: process.env.NEXT_PUBLIC_SWAPPER_ADDRESS,
                    // @ts-ignore
                    abi: SwapperABI,
                    function_name: "tokenToSwapidentifier",
                    params: {
                        "": nft.tokenId,
                    },
                })
                return deconstructSwap(swapstring, nft.tokenId);
            }))
            const metadata = await Promise.all(swapstrings.map(async (tokenId) => {
                return Moralis.Web3API.token.getTokenIdMetadata({
                    chain: "rinkeby",
                    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
                    token_id: tokenId,
                })
            }))
            const tokensWanted = parseMetadata(metadata);
            setActiveSwaps(tokensWanted.map((tokenWanted, index) => {
                return {
                    tokenStaked: ownedNFTs[index],
                    tokenWanted
                }
            }))
        }
        if(ownedNFTs.length > 0) {
            getActiveSwaps();
        }
    }, [ownedNFTs]);

    return {
        activeSwaps
    }
}

const deconstructSwap = (swapstring: string, stakedTokenId: number) => {
    const tokenIds = swapstring.split("_");
    return tokenIds[0] === String(stakedTokenId) ? tokenIds[1] : tokenIds[0];
}

export default useActiveSwaps;