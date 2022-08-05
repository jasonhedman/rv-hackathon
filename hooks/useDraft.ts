import useOwnedNFTs from "./useOwnedNFTs"

import { useWeb3ExecuteFunction } from "react-moralis";

import PoolABI from "../abis/Pool.json";
import { useEffect } from "react";

const useDraft = () => {

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, process.env.NEXT_PUBLIC_POOL_ADDRESS);

    const { data: withdrawEnabled  } = useWeb3ExecuteFunction({
        contractAddress: process.env.NEXT_PUBLIC_POOL_ADDRESS,
        functionName: "withdrawingAllowed",
        abi: PoolABI
    }, { autoFetch: true })

    console.log(withdrawEnabled);

    const { fetch } = useWeb3ExecuteFunction()

    const withdraw = async (tokenId: number) => {
        await fetch({
            params: {
                contractAddress: process.env.NEXT_PUBLIC_POOL_ADDRESS,
                functionName: "Withdraw",
                abi: PoolABI,
                params: {
                    _desiredTokenId: tokenId
                }
            }
        })
    }

    return {
        withdraw,
        withdrawEnabled: Boolean(withdrawEnabled),
        ownedNFTs
    }
}

export default useDraft;