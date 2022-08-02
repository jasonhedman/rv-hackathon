import { useMoralisQuery, useNewMoralisObject, useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import SwapperABI from "../abis/Swapper.json";
import useApprovalForAll from "./useApprovalForAll";

const useList = () => {

    const { account } = useMoralis();

    const { isApprovedForAll, approveForAll } = useApprovalForAll(process.env.NEXT_PUBLIC_SWAPPER_ADDRESS);

    const { data: userListings } = useMoralisQuery(
        "TradingBlock",
        query => query.equalTo("userAddress", account).equalTo("active", true),
        [],
        {
            live: true,
        }
    )

    const { save } = useNewMoralisObject("TradingBlock")

    const { fetch } = useWeb3ExecuteFunction();

    const list = async (tokenId : number) => {
        const listing = userListings.find(l => l.get('tokenId') === tokenId);
        if (listing) {
            await save({
                id: listing.id,
                active: false,
            })
        } else {
            await save({
                tokenId,
                userAddress: account,
                active: true,
            })
        }
    }

    const unlist = async (tokenId : number) => {
        const listing = userListings.find(l => l.get('tokenId') === tokenId);
        if (listing) {
            await save({
                id: listing.id,
                active: false
            })
        }
    }

    const createSwap = async (ownedTokenId : number, desiredTokenId : number) => {
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
        listedTokens: userListings.map(listing => ({
            id: listing.id,
            tokenId: listing.get('tokenId')
        })),
        list,
        unlist,
        createSwap,
        isApprovedForAll,
        approveForAll,
    }
}

export default useList;