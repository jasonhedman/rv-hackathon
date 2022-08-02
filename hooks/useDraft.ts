import useOwnedNFTs from "./useOwnedNFTs"

import { useWeb3ExecuteFunction } from "react-moralis";

import PoolABI from "../abis/Pool.json";

const useDraft = () => {

    const { ownedNFTs } = useOwnedNFTs(process.env.NEXT_PUBLIC_TOKEN_ADDRESS, process.env.NEXT_PUBLIC_POOL_ADDRESS);

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
        ownedNFTs
    }
}

export default useDraft;